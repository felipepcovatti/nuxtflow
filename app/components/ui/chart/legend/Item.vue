<script lang="ts" setup>
import type { LegendItem } from "~/types/chart";

defineProps<LegendItem>();
</script>
<template>
  <div class="flex min-h-6 items-center gap-1.5 text-sm">
    <div :style="{ backgroundColor: color }" class="h-3 w-3 rounded-full" />
    <div v-if="value !== undefined" class="flex gap-1">
      <div class="text-gray-400">{{ label }}:</div>
      <div>
        {{ value }}
      </div>
    </div>
    <div class="text-gray-400" v-else>{{ label }}</div>
  </div>
</template>
