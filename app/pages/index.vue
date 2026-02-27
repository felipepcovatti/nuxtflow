<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <OverviewRevenueOverTheWeek />
    <OverviewBalance />
    <div class="grid grid-cols-1 gap-4 lg:grid lg:grid-cols-3">
      <div class="lg:col-span-2">
        <OverviewVisitsByCountry />
      </div>
      <div class="flex flex-col gap-4">
        <OverviewVisitsByDevice />
        <OverviewProductsByRevenue />
      </div>
    </div>
    <OverviewTransactions />
  </div>
</template>
