<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <div class="grid grid-cols-1 gap-4 @5xl:grid-cols-3">
    <OverviewRevenueByDepartment class="@5xl:col-span-3" />
  </div>
</template>
