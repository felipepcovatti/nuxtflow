<script lang="ts" setup>
defineProps<{
  title: string;
  label: string;
  value: string | number;
}>();
</script>
<template>
  <div>
    <div class="text-gray-400">
      {{ title }}
    </div>
    <div class="mt-1 flex gap-1">
      <div class="text-gray-400">{{ label }}:</div>
      <div>
        {{ value }}
      </div>
    </div>
  </div>
</template>
