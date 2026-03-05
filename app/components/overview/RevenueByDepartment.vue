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
import type { LegendItem, RevenueChartRecord } from "~/types/chart";

const { data, error, refresh, pending } = useFetch("/api/revenue/departments");

const dayOfTheWeekGetter = ({ dayOfTheWeek }: RevenueChartRecord) =>
  dayOfTheWeek;

const revenueGetters = computed(() =>
  products.value.map(
    (product) => (record: RevenueChartRecord) => record[product.id],
  ),
);

const revenueRecords = computed<RevenueChartRecord[]>(() =>
  mapRevenueToChartData(data.value?.week_records || []),
);

const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];

const products = computed(() => data.value?.products || []);

const hoveredDayOfTheWeek = ref<number | null>(null);

const hoveredProductIndex = ref<number | null>(null);

const events = {
  [GroupedBar.selectors.barGroup]: {
    mouseenter: (record: RevenueChartRecord) => {
      hoveredDayOfTheWeek.value = record.dayOfTheWeek;
    },
    mouseleave: () => (hoveredDayOfTheWeek.value = null),
  },
};

const triggers = {
  [GroupedBar.selectors.barGroup]: ({
    dayOfTheWeek,
    ...productIds
  }: RevenueChartRecord) => {
    const items = Object.entries(productIds).flatMap<Required<LegendItem>>(
      ([productId, amount]) => {
        const product = products.value.find(({ id }) => id === productId);
        if (!product) return [];
        const index = products.value.indexOf(product);
        return [
          { color: COLORS[index] || "", label: product.name, value: amount },
        ];
      },
    );
    const tooltip = document.createElement("div");
    const content: VNode = h(ChartTooltipContent, {
      items,
      title: $t(`dayOfTheWeekLong.${dayOfTheWeek}`),
    });
    render(content, tooltip);
    return tooltip;
  },
};

const chartWrapperRef = useTemplateRef("chartWrapper");

function handleMutedState(
  attribute: "data-product-index" | "data-day-of-the-week",
  hoveredItem: number | null,
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

watch(hoveredProductIndex, (hovered) =>
  handleMutedState("data-product-index", hovered),
);

const { isExtraSmall } = useIsExtraSmall();

const { formatAsMoney } = useMoneyFormatter();

const { t } = useI18n();
</script>

<template>
  <UiCard
    class="min-h-149"
    :title="data ? formatAsMoney(data.total) : ''"
    :subtitle="t('subtitle')"
  >
    <UiSpinner v-if="pending" />
    <div
      v-else-if="error"
      class="flex flex-1 flex-col items-center justify-center gap-1 text-center"
    >
      <div>{{ t("loadError") }}</div>
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
    <template v-else>
      <div ref="chartWrapper" class="flex-1">
        <ClientOnly>
          <VisXYContainer
            :data="revenueRecords"
            :height="418"
            :x-domain="[0, 6]"
          >
            <VisGroupedBar
              :x="dayOfTheWeekGetter"
              :y="revenueGetters"
              :rounded-corners="4"
              :data-step="1"
              :attributes="{
                [GroupedBar.selectors.barGroup]: {
                  'data-day-of-the-week': ({
                    dayOfTheWeek,
                  }: RevenueChartRecord) => dayOfTheWeek,
                },
                [GroupedBar.selectors.bar]: {
                  'data-product-index': (
                    _: RevenueChartRecord,
                    index: number,
                  ) => index % products.length,
                },
              }"
              :color="(_: RevenueChartRecord, index: number) => COLORS[index]"
              :events="events"
            />
            <VisAxis
              type="x"
              :grid-line="false"
              :tick-line="undefined"
              :tick-values="
                revenueRecords.map(({ dayOfTheWeek }) => dayOfTheWeek)
              "
              :tick-format="
                (dayOfTheWeek: number) => $t(`dayOfTheWeek.${dayOfTheWeek}`)
              "
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
          v-for="(product, index) in products"
          :key="product.id"
          class="cursor-default"
          @mouseenter="hoveredProductIndex = index"
          @mouseleave="hoveredProductIndex = null"
        >
          <ChartLegendItem :color="COLORS[index] ?? ''" :label="product.name" />
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

<i18n lang="json">
{
  "en": {
    "totalRevenue": "Total revenue for example.com",
    "loadError": "Error during chart data load"
  }
}
</i18n>
