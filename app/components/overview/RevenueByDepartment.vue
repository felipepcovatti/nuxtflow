<script setup lang="ts">
import { DEPARTMENTS } from "~/constants/revenues";

const {
  pending,
  dateRange,
  revenues,
  totalRevenue,
  revenuesDateGetter,
  revenuesFullDateGetter,
  chartType,
  refresh,
} = useDepartmentRevenues();
</script>

<template>
  <UiCard
    :loading="pending"
    class="min-h-149"
    :title="totalRevenue"
    :subtitle="$t('revenueByDepartment')"
  >
    <template #headerEnd>
      <UiDateRangePicker v-model="dateRange" @selected="refresh" />
    </template>
    <UiChart
      :type="chartType"
      :group-records="revenues"
      :group-x-getter="revenuesDateGetter"
      :tooltip-title-getter="revenuesFullDateGetter"
      :item-y-getter="departmentRevenuesRevenueGetter"
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
