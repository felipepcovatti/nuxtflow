<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <div class="flex w-full">
    <OverviewRevenueChart />
  </div>
</template>
