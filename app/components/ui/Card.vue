<script lang="ts" setup>
defineProps<{
  title: string | number;
  subtitle?: string;
  loading?: boolean;
  link?: {
    label: string;
    to: string;
  };
}>();
</script>
<template>
  <div class="card" :data-loading="loading">
    <header class="flex flex-wrap items-center justify-end gap-6">
      <div class="flex-1">
        <div class="section-title mb-1">
          {{ title }}
        </div>
        <div v-if="subtitle">{{ subtitle }}</div>
      </div>
      <slot name="headerEnd" />
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
