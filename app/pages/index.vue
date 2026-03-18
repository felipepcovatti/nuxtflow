<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <div class="@container flex flex-col gap-4">
    <OverviewRevenueByDepartment />
    <!-- <OverviewStats />
    <div class="grid grid-cols-1 gap-4 @5xl:grid @5xl:grid-cols-3">
      <div class="@5xl:col-span-2">
        <OverviewVisitsByCountry />
      </div>
      <div class="flex flex-col gap-4">
        <OverviewVisitsByDevice />
        <OverviewRevenueByProduct />
      </div>
    </div>
    <OverviewTransactions /> -->
  </div>
</template>
