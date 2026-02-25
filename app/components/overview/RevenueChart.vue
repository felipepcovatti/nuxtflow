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
import type { LegendItem, RevenueRecord } from "~/types/chart";

const { data, error, refresh, pending } = useFetch("/api/revenue");

const dayOfTheWeekGetter = ({ dayOfTheWeek }: RevenueRecord) => dayOfTheWeek;

const revenueGetters = computed(() =>
  products.value.map(
    (product) => (record: RevenueRecord) => record[product.id],
  ),
);

const revenueRecords = computed<RevenueRecord[]>(() =>
  mapRevenueToChartData(data.value?.week_records || []),
);

const colors = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];

const products = computed(() => data.value?.products || []);

const hoveredDayOfTheWeek = ref<number | null>(null);

const hoveredProductIndex = ref<number | null>(null);

const events = {
  [GroupedBar.selectors.barGroup]: {
    mouseenter: (record: RevenueRecord) => {
      hoveredDayOfTheWeek.value = record.dayOfTheWeek;
    },
    mouseleave: () => (hoveredDayOfTheWeek.value = null),
  },
};

const triggers = {
  [GroupedBar.selectors.barGroup]: ({
    dayOfTheWeek,
    ...productIds
  }: RevenueRecord) => {
    const items = Object.entries(productIds).flatMap<Required<LegendItem>>(
      ([productId, amount]) => {
        const product = products.value.find(({ id }) => id === productId);
        if (!product) return [];
        const index = products.value.indexOf(product);
        return [
          { color: colors[index] || "", label: product.name, value: amount },
        ];
      },
    );
    const container = document.createElement("div");
    const content: VNode = h(ChartTooltipContent, {
      items,
      title: t(`dayOfTheWeekLong.${dayOfTheWeek}`),
    });
    render(content, container);
    return container;
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
        {{ t("tryAgain") }}
      </button>
    </div>
    <template v-else>
      <div ref="chartWrapper" class="flex-1">
        <VisXYContainer :data="revenueRecords" :height="418" :x-domain="[0, 6]">
          <VisGroupedBar
            :x="dayOfTheWeekGetter"
            :y="revenueGetters"
            :rounded-corners="4"
            :data-step="1"
            :attributes="{
              [GroupedBar.selectors.barGroup]: {
                'data-day-of-the-week': ({ dayOfTheWeek }: RevenueRecord) =>
                  dayOfTheWeek,
              },
              [GroupedBar.selectors.bar]: {
                'data-product-index': (_: RevenueRecord, index: number) =>
                  index % products.length,
              },
            }"
            :color="(_: RevenueRecord, index: number) => colors[index]"
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
              (dayOfTheWeek: number) => t(`dayOfTheWeek.${dayOfTheWeek}`)
            "
            :domain-line="false"
          />
          <ClientOnly>
            <VisAxis
              v-if="!isExtraSmall"
              type="y"
              :grid-line="false"
              :tick-line="undefined"
              :domain-line="false"
            />
          </ClientOnly>
          <VisTooltip
            :triggers="triggers"
            :attributes="{ 'data-selector': 'tooltip' }"
            vertical-placement="bottom"
            :vertical-shift="16"
          />
        </VisXYContainer>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="cursor-default"
          @mouseenter="hoveredProductIndex = index"
          @mouseleave="hoveredProductIndex = null"
        >
          <ChartLegendItem :color="colors[index] ?? ''" :label="product.name" />
        </div>
      </div>
    </template>
  </UiCard>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  :deep([data-selector="tooltip"]) {
    @apply rounded border-0 bg-gray-700 p-2 text-sm/loose text-white;
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
    "subtitle": "Total revenue for example.com",
    "dayOfTheWeek": {
      "0": "Mon",
      "1": "Tue",
      "2": "Wed",
      "3": "Thu",
      "4": "Fri",
      "5": "Sat",
      "6": "Sun"
    },
    "dayOfTheWeekLong": {
      "0": "Monday",
      "1": "Tuesday",
      "2": "Wednesday",
      "3": "Thursday",
      "4": "Friday",
      "5": "Saturday",
      "6": "Sunday"
    },
    "loadError": "Error during chart data load",
    "tryAgain": "Try again"
  }
}
</i18n>
