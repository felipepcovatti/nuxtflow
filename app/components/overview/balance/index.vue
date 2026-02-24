<script setup lang="ts">
const { data, error, refresh, pending } = useFetch("/api/balance");

const { t } = useI18n();
</script>
<template>
  <div v-if="data" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <OverviewBalanceCard
      :title="t('totalIncome')"
      :current-month-total="data.current_month.income"
      :last-three-months-average="data.last_three_months_average.income"
      money
      icon="flowbite:chart-mixed-dollar-solid"
    />
    <OverviewBalanceCard
      :title="t('totalOutcome')"
      :current-month-total="data.current_month.outcome"
      :last-three-months-average="data.last_three_months_average.outcome"
      money
      inverted-sentiment
      icon="flowbite:chart-line-down-outline"
    />
    <OverviewBalanceCard
      :title="t('totalProfit')"
      :current-month-total="data.current_month.profit"
      :last-three-months-average="data.last_three_months_average.profit"
      money
      icon="flowbite:dollar-solid"
    />
    <OverviewBalanceCard
      :title="t('newCustomers')"
      :current-month-total="data.current_month.new_customers"
      :last-three-months-average="data.last_three_months_average.new_customers"
      icon="flowbite:users-group-solid"
    />
  </div>
  <UiSpinner v-else class="h-38" />
</template>
<i18n lang="json">
{
  "en": {
    "totalIncome": "Total Income",
    "totalOutcome": "Total Outcome",
    "totalProfit": "Total Profit",
    "newCustomers": "New Customers"
  }
}
</i18n>
