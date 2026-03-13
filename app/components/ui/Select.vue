<script setup lang="ts">
export interface SelectOption {
  value: string;
  label: string;
}

const props = defineProps<{
  options: SelectOption[];
  bordered?: boolean;
}>();

const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <SelectRoot v-model="modelValue">
    <SelectTrigger :class="['button', { 'border-transparent': !bordered }]">
      <SelectValue />
      <Icon name="mdi:chevron-down" size="1.25rem" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="z-100 overflow-hidden rounded-lg bg-gray-700 shadow-xl"
        position="popper"
        :side-offset="4"
      >
        <SelectViewport class="p-1">
          <SelectGroup>
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              class="data-highlighted:bg-primary-700 relative flex h-8 cursor-pointer items-center rounded-sm px-8 text-sm text-gray-300 outline-none select-none data-highlighted:text-white"
            >
              <SelectItemIndicator
                class="absolute left-2 inline-flex items-center justify-center"
              >
                <span class="text-xs">✓</span>
              </SelectItemIndicator>

              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
