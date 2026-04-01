<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

const model = defineModel<boolean | "indeterminate">();
</script>

<template>
  <CheckboxRoot
    v-model="model"
    :class="[
      'relative text-white after:absolute after:-inset-3',
      'ring-primary-400 flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-transparent hover:ring',
      'aria-checked:bg-primary-700 aria-checked:border-primary-400 data-[state=checked]:text-white',
    ]"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Icon
        :name="
          model === 'indeterminate'
            ? 'radix-icons:divider-horizontal'
            : 'radix-icons:check'
        "
      />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
