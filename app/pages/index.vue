<script setup lang="ts">
definePageMeta({
  alias: "/overview",
  middleware: ({ path }) => {
    if (path !== "/overview") return "/overview";
  },
});
</script>
<template>
  <NuxtLayout name="internal" class="text-white"> Overview </NuxtLayout>
</template>
