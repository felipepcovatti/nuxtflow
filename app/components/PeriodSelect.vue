<script lang="ts" setup>
import { PERIOD_PRESETS } from "~/constants/time";
import type { PeriodPreset } from "~/types/time";
import type { SelectOption } from "./ui/Select.vue";

const period = defineModel<PeriodPreset>({ required: true });

defineProps<{
  bordered?: boolean;
}>();
</script>
<template>
  <UiSelect
    v-model="period"
    :trigger-aria-label="$t('selectThePeriod')"
    :options="
      PERIOD_PRESETS.map<SelectOption>((period) => ({
        label: $t(`periodPresets.${period}`),
        value: period,
      }))
    "
    :bordered="bordered"
  />
</template>
