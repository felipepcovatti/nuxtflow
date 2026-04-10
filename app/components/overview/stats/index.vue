<script setup lang="ts">
const { data, pending } = useApi("/api/stats");
</script>
<template>
  <div class="grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4">
    <OverviewStatsCard
      :title="$t('totalIncome')"
      :data="data?.income"
      :loading="pending"
      money
      icon="flowbite:chart-mixed-dollar-solid"
    />
    <OverviewStatsCard
      :title="$t('totalOutcome')"
      :data="data?.outcome"
      :loading="pending"
      money
      inverted-sentiment
      icon="flowbite:chart-line-down-outline"
    />
    <OverviewStatsCard
      :title="$t('totalProfit')"
      :data="data?.profit"
      :loading="pending"
      money
      icon="flowbite:dollar-solid"
    />
    <OverviewStatsCard
      :title="$t('newCustomers')"
      :data="data?.new_customers"
      :loading="pending"
      icon="flowbite:users-group-solid"
    />
  </div>
</template>
