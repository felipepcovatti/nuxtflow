<script lang="ts" setup>
import { PERIOD_PRESETS, type PeriodPreset } from "~/constants/api";
import type { SelectOption } from "./ui/Select.vue";

const period = defineModel<PeriodPreset>({ required: true });

defineProps<{
  bordered?: boolean;
}>();

const periodOptions = computed<SelectOption[]>(() =>
  PERIOD_PRESETS.map<SelectOption>((period) => ({
    label: $t(`dataPeriods.${period}`),
    value: period,
  })),
);
</script>
<template>
  <UiSelect :options="periodOptions" v-model="period" :bordered="bordered" />
</template>
