<script lang="ts" setup>
defineProps<{
  title?: string | number;
  subtitle?: string;
}>();
</script>
<template>
  <div
    class="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-6 text-base text-gray-400"
  >
    <header
      v-if="title !== undefined || subtitle || $slots.headerEnd"
      class="flex flex-wrap items-center justify-end gap-6"
    >
      <div v-if="title !== undefined || subtitle" class="flex-1">
        <div v-if="title" class="section-title mb-1">
          {{ title }}
        </div>
        <div v-if="subtitle">{{ subtitle }}</div>
      </div>
      <slot name="headerEnd" />
    </header>
    <slot />
  </div>
</template>
