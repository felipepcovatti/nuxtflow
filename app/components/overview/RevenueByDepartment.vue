<script setup lang="ts">
import {
  VisXYContainer,
  VisGroupedBar,
  VisAxis,
  VisTooltip,
  VisStackedBar,
  VisArea,
} from "@unovis/vue";
import { GroupedBar } from "@unovis/ts";
import ChartTooltipContent from "../chart/tooltip/Content.vue";
import type { LegendItem } from "~/types/chart";
import type { Department, DepartmentRevenuesByDate } from "~/types/revenue";
import {
  render,
  ref,
  computed,
  useTemplateRef,
  watch,
  h,
  type VNode,
} from "vue";
import { format, subDays, subYears } from "date-fns";

const DEPARTMENTS: ReadonlyArray<Department> = [
  "electronics",
  "home_living",
  "clothing_accessories",
];

const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];
const { isExtraSmall } = useIsExtraSmall();

const { formatAsMoney } = useMoneyFormatter();
const { formatAsShortDate, formatAsWeekday } = useDateFormatter();

const dateRange = ref({
  start: format(subDays(new Date(), 6), "yyyy-MM-dd"),
  end: format(new Date(), "yyyy-MM-dd"),
});

const { data, error, refresh, pending } = useFetch("/api/revenue/departments", {
  query: dateRange,
});

const dateGetter = ({ days_from_today }: DepartmentRevenuesByDate) => {
  return days_from_today;
};

const colorGetter = (_: DepartmentRevenuesByDate, index: number) => {
  return COLORS[index];
};

const xTickFormat = (value: number) => {
  if (!Number.isInteger(value)) return "";
  if (value === 0) return $t("today");
  if (value === -1) return $t("yesterday");
  const record = revenues.value.find(
    ({ days_from_today }) => days_from_today === value,
  );
  if (!record) return value;
  return value < -6
    ? formatAsShortDate(record.date)
    : formatAsWeekday(record.date);
};

const revenueGetters = DEPARTMENTS.map(
  (department) =>
    ({ revenues }: DepartmentRevenuesByDate) =>
      revenues[department],
);

const revenues = computed(() => data.value?.data.revenues || []);

const hoveredDayOfTheWeek = ref<string | null>(null);

const hoveredProductIndex = ref<number | null>(null);

const events = {
  [GroupedBar.selectors.barGroup]: {
    mouseenter: ({ date }: DepartmentRevenuesByDate) => {
      hoveredDayOfTheWeek.value = date;
    },
    mouseleave: () => (hoveredDayOfTheWeek.value = null),
  },
};

const triggers = {
  [GroupedBar.selectors.barGroup]: ({
    date,
    revenues,
  }: DepartmentRevenuesByDate) => {
    const items = Object.entries(revenues).flatMap<Required<LegendItem>>(
      ([department, amount]) => {
        return [{ color: "", label: department, value: amount }];
      },
    );
    const tooltip = document.createElement("div");
    const content: VNode = h(ChartTooltipContent, {
      items,
      title: $t(`dayOfTheWeekLong.${date}`),
    });
    render(content, tooltip);
    return tooltip;
  },
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
</script>

<template>
  <UiCard
    class="min-h-149"
    :title="data ? formatAsMoney(data.data.total_revenue) : ''"
    :subtitle="$t('siteTotalRevenue', { site: 'example.com' })"
  >
    <template #header-end>
      <UiDateRangePicker
        v-model="dateRange"
        min-preset="lastYear"
        disable-future
      />
    </template>
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
          <VisXYContainer :data="data.data.revenues" :height="418">
            <VisGroupedBar
              v-if="revenues.length < 8"
              :x="dateGetter"
              :y="revenueGetters"
              :rounded-corners="4"
              :triggers="triggers"
              :color="colorGetter"
            />
            <VisStackedBar
              v-else-if="revenues.length < 31"
              :x="dateGetter"
              :y="revenueGetters"
              :rounded-corners="4"
              :bar-padding="0.25"
            />
            <VisArea
              v-else
              :x="dateGetter"
              :y="revenueGetters"
              :rounded-corners="4"
            />
            <VisAxis
              :tick-rotation="45"
              type="x"
              :grid-line="false"
              :tick-line="undefined"
              :domain-line="false"
              :tick-text-angle="isExtraSmall ? 90 : 0"
              :tick-format="xTickFormat"
              :tick-text-align="isExtraSmall ? 'left' : 'center'"
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
          <ChartLegendItem
            :color="COLORS[index] ?? ''"
            :label="$t('departments.' + department)"
          />
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
