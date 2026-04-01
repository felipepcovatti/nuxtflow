<script setup lang="ts">
const { data } = useApi("/api/stats");
</script>
<template>
  <div v-if="data" class="grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4">
    <OverviewStatsCard
      :title="$t('totalIncome')"
      :data="data.income"
      money
      icon="flowbite:chart-mixed-dollar-solid"
    />
    <OverviewStatsCard
      :title="$t('totalOutcome')"
      :data="data.outcome"
      money
      inverted-sentiment
      icon="flowbite:chart-line-down-outline"
    />
    <OverviewStatsCard
      :title="$t('totalProfit')"
      :data="data.profit"
      money
      icon="flowbite:dollar-solid"
    />
    <OverviewStatsCard
      :title="$t('newCustomers')"
      :data="data.new_customers"
      icon="flowbite:users-group-solid"
    />
  </div>
  <UiCard v-else class="h-41.75">
    <UiSpinner />
  </UiCard>
</template>
