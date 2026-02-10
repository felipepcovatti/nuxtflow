<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <h1 class="text-lg">Overview</h1>
  [not implemented]
</template>
