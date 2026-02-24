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
  </div>
</template>
