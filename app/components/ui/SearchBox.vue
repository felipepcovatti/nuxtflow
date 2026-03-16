<script lang="ts" setup>
const term = defineModel<string>({ required: true });

defineProps<{
  large?: boolean;
}>();
</script>
<template>
  <div
    :class="[
      'relative w-full max-w-100',
      large ? 'h-10.5 sm:max-w-100' : 'h-9 sm:max-w-96',
    ]"
  >
    <input
      v-model="term"
      name="search_field"
      class="h-full w-full rounded-lg border border-gray-600 bg-gray-700 pr-4 pl-11 text-sm text-gray-400"
      :placeholder="$t('search')"
    />
    <Icon
      name="mdi:magnify"
      class="absolute inset-y-0 left-4 my-auto text-gray-400"
      size="1.25rem"
    />
  </div>
</template>
