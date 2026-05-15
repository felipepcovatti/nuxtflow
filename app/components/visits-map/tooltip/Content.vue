<script lang="ts" setup>
defineProps<{
  country: string;
  visits: string;
  visitsLabel: string;
}>();
</script>
<template>
  <div>
    <div class="text-gray-400">
      {{ country }}
    </div>
    <div class="mt-1 flex gap-1">
      <div class="text-gray-400">{{ visitsLabel }}:</div>
      <div>
        {{ visits }}
      </div>
    </div>
  </div>
</template>
