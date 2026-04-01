<script setup lang="ts">
import type { Department, DepartmentRevenuesByDate } from "~/types/revenue";
import { ref, computed } from "vue";
import { format, isToday, isYesterday, parseISO, subDays } from "date-fns";

const DEPARTMENTS: ReadonlyArray<{ id: Department; color: string }> = [
  { id: "electronics", color: "var(--color-primary-700)" },
  { id: "home_living", color: "var(--color-orange-300)" },
  { id: "clothing_accessories", color: "var(--color-teal-400)" },
];

const { isExtraSmall } = useIsExtraSmall();

const { formatAsMoney } = useMoneyFormatter();
const { formatAsShortDate, formatAsWeekday, formatAsFullDate } =
  useDateFormatter();

const dateRange = ref({
  start: format(subDays(new Date(), 6), "yyyy-MM-dd"),
  end: format(new Date(), "yyyy-MM-dd"),
});

const { data, pending } = useApi("/api/revenue/departments", {
  query: dateRange,
});

const revenues = computed(() => data.value?.data.revenues.toReversed() || []);

type ChartType = "grouped-bar" | "stacked-bar" | "stacked-area";

const chartType = computed<ChartType>(() => {
  const { length } = revenues.value;
  if (length < 8) return "grouped-bar";
  if (length < 31) return "stacked-bar";
  return "stacked-area";
});

function itemXGetter(record: DepartmentRevenuesByDate) {
  const date = parseISO(record.date);
  if (isToday(date)) return $t("today");
  if (isYesterday(date)) return $t("yesterday");
  if (isExtraSmall.value) return formatAsShortDate(date);
  return formatAsWeekday(date);
}
</script>

<template>
  <UiCard
    class="min-h-149"
    :title="data ? formatAsMoney(data.data.total_revenue) : ''"
    :subtitle="$t('siteTotalRevenue', { site: 'example.com' })"
  >
    <template #headerEnd>
      <UiDateRangePicker
        v-model="dateRange"
        minStart="one-year-ago"
        disable-future
      />
    </template>
    <UiSpinner v-if="pending" />
    <template v-else-if="data">
      <UiChart
        :type="chartType"
        :data-records="revenues"
        :item-x-getter="itemXGetter"
        :tooltip-title-getter="(record) => formatAsFullDate(record.date)"
        :item-y-getter="(record, id) => record.revenues[id]"
        :items="
          DEPARTMENTS.map(({ id, color }) => ({
            id,
            label: $t('departments.' + id),
            color,
          }))
        "
      />
    </template>
  </UiCard>
</template>
