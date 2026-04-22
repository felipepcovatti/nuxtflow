<script setup lang="ts" generic="T extends string">
export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

const props = defineProps<{
  triggerAriaLabel: string;
  options: SelectOption<T>[];
  bordered?: boolean;
}>();

const modelValue = defineModel<T>({ required: true });

const selected = computed(() =>
  props.options.find((option) => option.value === modelValue.value),
);
</script>

<template>
  <SelectRoot v-model="modelValue">
    <SelectTrigger
      :class="['button', { 'border-transparent': !bordered }]"
      :aria-label="triggerAriaLabel"
    >
      <SelectValue v-if="selected" as-child>
        <span>
          <slot :selected="selected">
            {{ selected.label }}
          </slot>
        </span>
      </SelectValue>
      <Icon name="mdi:chevron-down" size="1.25rem" class="ml-auto" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="z-100 overflow-hidden rounded-lg bg-gray-900 shadow-lg"
        position="popper"
        :side-offset="4"
      >
        <SelectViewport class="min-w-34 p-1">
          <SelectGroup class="grid gap-1">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              class="data-highlighted:bg-primary-700 aria-selected:bg-primary-300/20 flex cursor-pointer items-center rounded-sm px-4 py-2 text-sm text-gray-300 aria-selected:text-white data-highlighted:text-white"
            >
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
