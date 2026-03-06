<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

const model = defineModel<boolean | "indeterminate">();
</script>

<template>
  <CheckboxRoot
    v-model="model"
    :class="[
      'relative text-white after:absolute after:-inset-3',
      'flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-gray-600 transition-colors',
      'data-[state=checked]:bg-primary-700 data-[state=checked]:border-white data-[state=checked]:text-white',
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
