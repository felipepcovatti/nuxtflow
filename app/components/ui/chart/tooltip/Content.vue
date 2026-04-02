<script lang="ts" setup>
import type { LegendItem } from "~/types/chart";

defineProps<{
  title: string;
  items: Required<LegendItem>[];
}>();
</script>
<template>
  <div>
    <div class="text-gray-400">
      {{ title }}
    </div>
    <div class="mt-1 flex flex-col gap-1">
      <ChartLegendItem v-for="item in items" v-bind="item" :key="item.label" />
    </div>
  </div>
</template>
