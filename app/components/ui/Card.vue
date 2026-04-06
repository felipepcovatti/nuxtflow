<script lang="ts" setup>
defineProps<{
  title?: string | number;
  subtitle?: string;
  link?: {
    label: string;
    to: string;
  };
}>();
</script>
<template>
  <div
    class="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-6 text-base text-gray-400"
  >
    <header
      v-if="title !== undefined || subtitle || $slots.headerEnd"
      class="flex flex-wrap justify-end gap-6"
    >
      <div v-if="title !== undefined || subtitle" class="flex-1">
        <div v-if="title" class="section-title mb-1">
          {{ title }}
        </div>
        <div v-if="subtitle">{{ subtitle }}</div>
      </div>
      <div v-if="$slots.headerEnd" class="mt-2.5">
        <slot name="headerEnd" />
      </div>
    </header>
    <slot />
    <footer
      v-if="$slots.footer || link"
      class="mt-auto flex items-center justify-between border-t border-gray-700 pt-5"
    >
      <slot name="footer" />

      <NuxtLink
        v-if="link"
        :to="link.to"
        class="text-primary-400 hover:text-primary-200 ml-auto flex items-center gap-2 p-2 text-sm uppercase transition-colors"
      >
        {{ link.label }}
        <Icon name="mdi:arrow-right" size="1.25rem" />
      </NuxtLink>
    </footer>
  </div>
</template>
