<script lang="ts" setup>
import { DATA_PERIODS, type DataPeriod } from "~/constants/api";
import type { SelectOption } from "./ui/Select.vue";

const period = defineModel<DataPeriod>({ required: true });

defineProps<{
  bordered?: boolean;
}>();

const periodOptions = computed<SelectOption[]>(() =>
  DATA_PERIODS.map<SelectOption>((period) => ({
    label: $t(`dataPeriods.${period}`),
    value: period,
  })),
);
</script>
<template>
  <UiSelect :options="periodOptions" v-model="period" :bordered="bordered" />
</template>
