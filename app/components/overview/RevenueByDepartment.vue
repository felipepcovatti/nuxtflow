<script setup lang="ts">
import {
  VisXYContainer,
  VisGroupedBar,
  VisAxis,
  VisTooltip,
} from "@unovis/vue";
import { GroupedBar } from "@unovis/ts";
import { render } from "vue";
import ChartTooltipContent from "../chart/tooltip/Content.vue";
import type { DepartmentRevenuesChartRecord, LegendItem } from "~/types/chart";
import type { Department, DepartmentRevenuesByDate } from "~/types/revenue";
import { Scale } from "@unovis/ts";

const DEPARTMENTS: ReadonlyArray<Department> = [
  "electronics",
  "home_living",
  "clothing_accessories",
];

const { data, error, refresh, pending } = useFetch("/api/revenue/departments", {
  query: {
    start: "2026-03-15",
  },
});

const dateGetter = ({ daysFromToday }: DepartmentRevenuesChartRecord) => {
  return daysFromToday;
};

const xTickFormat = (xValue: number) => {
  if (xValue === 0) return "Today";
  if (xValue === -1) return "Yesterday";

  // Otherwise, find the date string we stored
  const record = revenues.value.find((r) => r.daysFromToday === xValue);
  return record ? record.date : "";
};

const revenueGetters = DEPARTMENTS.map(
  (department) =>
    ({ date, ...departments }: DepartmentRevenuesChartRecord) =>
      departments[department],
);

const revenues = computed(() =>
  mapDepartmentRevenuesToChartData(data.value?.data.revenues || []),
);

const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];

const hoveredDayOfTheWeek = ref<string | null>(null);

const hoveredProductIndex = ref<number | null>(null);

const events = {
  [GroupedBar.selectors.barGroup]: {
    mouseenter: ({ date }: DepartmentRevenuesChartRecord) => {
      hoveredDayOfTheWeek.value = date;
    },
    mouseleave: () => (hoveredDayOfTheWeek.value = null),
  },
};

const triggers = {
  // [GroupedBar.selectors.barGroup]: ({
  //   date,
  //   revenues,
  // }: DepartmentRevenuesByDate) => {
  //   const items = Object.entries(revenues).flatMap<Required<LegendItem>>(
  //     ([department, amount]) => {
  //       const index = DEPARTMENTS.indexOf(department);
  //       return [
  //         { color: COLORS[index] || "", label: department, value: amount },
  //       ];
  //     },
  //   );
  //   const tooltip = document.createElement("div");
  //   const content: VNode = h(ChartTooltipContent, {
  //     items,
  //     title: $t(`dayOfTheWeekLong.${date}`),
  //   });
  //   render(content, tooltip);
  //   return tooltip;
  // },
};

const chartWrapperRef = useTemplateRef("chartWrapper");

function handleMutedState(
  attribute: "data-product-index" | "data-day-of-the-week",
  hoveredItem: string | null,
) {
  if (!chartWrapperRef.value) return;
  const elements = chartWrapperRef.value.querySelectorAll(`[${attribute}]`);
  elements.forEach((element) => {
    const value = element.getAttribute(attribute);
    element.classList.toggle(
      "muted",
      hoveredItem !== null && hoveredItem.toString() !== value,
    );
  });
}

watch(hoveredDayOfTheWeek, (hovered) =>
  handleMutedState("data-day-of-the-week", hovered),
);

// watch(hoveredProductIndex, (hovered) =>
//   handleMutedState("data-product-index", hovered),
// );

const { isExtraSmall } = useIsExtraSmall();

const { formatAsMoney } = useMoneyFormatter();
</script>

<template>
  {{ revenues }}
  <UiCard
    class="min-h-149"
    :title="data ? formatAsMoney(data.data.total_revenue) : ''"
    :subtitle="$t('siteTotalRevenue', { site: 'example.com' })"
  >
    <template #header-end>{{ data?.meta.period }}</template>
    <UiSpinner v-if="pending" />
    <div
      v-else-if="error"
      class="flex flex-1 flex-col items-center justify-center gap-1 text-center"
    >
      <div>{{ $t("loadError") }}</div>
      <div>
        {{ error.statusMessage }}
      </div>
      <button
        @click="() => refresh()"
        class="mt-2 cursor-pointer rounded bg-gray-700 p-2"
      >
        {{ $t("tryAgain") }}
      </button>
    </div>
    <template v-else-if="data">
      <div ref="chartWrapper" class="flex-1">
        <ClientOnly>
          <VisXYContainer :data="revenues" :height="418">
            <VisGroupedBar
              :x="dateGetter"
              :y="revenueGetters"
              :rounded-corners="4"
            />
            <VisAxis
              type="x"
              :grid-line="false"
              :tick-line="undefined"
              :domain-line="false"
            />
            <VisAxis
              v-if="!isExtraSmall"
              type="y"
              :grid-line="false"
              :tick-line="undefined"
              :domain-line="false"
            />
            <VisTooltip
              :triggers="triggers"
              :attributes="{ 'data-selector': 'tooltip' }"
              vertical-placement="bottom"
              :vertical-shift="16"
            />
          </VisXYContainer>
        </ClientOnly>
      </div>

      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
        <div
          v-for="(department, index) in DEPARTMENTS"
          :key="department"
          class="cursor-default"
        >
          <ChartLegendItem :color="COLORS[index] ?? ''" :label="department" />
        </div>
      </div>
    </template>
  </UiCard>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  :deep([data-selector="tooltip"]) {
    @apply tooltip;
  }
  :deep([data-day-of-the-week]),
  :deep([data-product-index]) {
    @apply [transition:opacity_200ms_ease_200ms];
    &.muted {
      @apply opacity-40!;
    }
  }
  :deep(.legend-bullet) {
    @apply h-3 w-3 rounded-full shadow-sm;
  }
}
</style>
