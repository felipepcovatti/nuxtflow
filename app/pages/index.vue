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
    <OverviewRevenueChart />
    <OverviewBalance />
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="sm:col-span-2">
        <OverviewVisitMap />
      </div>
      <div></div>
    </div>
  </div>
</template>
