<script setup lang="ts">
import type { DepartmentRevenuesByDate } from "~/types/revenue";
import { ref, computed } from "vue";
import {
  addDays,
  endOfToday,
  isAfter,
  isToday,
  isYesterday,
  startOfToday,
} from "date-fns";
import { DEPARTMENTS } from "~/constants/revenues";

const { formatAsMoney } = useMoneyFormatter();
const { formatAsShortDate, formatAsWeekday, formatAsFullDate } =
  useDateFormatter();

const dateRange = ref({
  start: addDays(startOfToday(), -6).toISOString(),
  end: endOfToday().toISOString(),
});

const { data, pending, refresh } = useApi("/api/revenue/departments", {
  query: dateRange,
  watch: false,
});

const revenues = computed(() => data.value?.data.revenues.toReversed() || []);

const chartType = computed(() =>
  getRevenueByDepartmentChartType({ days: revenues.value.length }),
);

function itemXGetter(record: DepartmentRevenuesByDate) {
  if (isToday(record.date)) return $t("today");
  if (isYesterday(record.date)) return $t("yesterday");
  if (isAfter(record.date, addDays(endOfToday(), -7)))
    return formatAsWeekday(record.date);
  return formatAsShortDate(record.date);
}
</script>

<template>
  <UiCard
    :loading="pending"
    class="min-h-149"
    :title="data ? formatAsMoney(data.data.total_revenue) : ''"
    :subtitle="$t('revenueByDepartment')"
  >
    <template #headerEnd>
      <UiDateRangePicker
        v-model="dateRange"
        @selected="refresh"
        minStart="one-year-ago"
        disable-future
      />
    </template>
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
  </UiCard>
</template>
