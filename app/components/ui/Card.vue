<script lang="ts" setup>
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>
<template>
  <div
    class="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-6 text-base text-gray-400"
  >
    <header
      v-if="title || subtitle"
      class="flex flex-wrap items-center justify-between gap-6"
    >
      <div>
        <div class="heading-2">
          {{ title }}
        </div>
        <div>{{ subtitle }}</div>
      </div>
      <slot name="header-end" />
    </header>
    <slot />
  </div>
</template>
