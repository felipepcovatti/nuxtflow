<script lang="ts" setup>
import { DATE_RANGE_PRESETS } from "~/constants/date";
import type { DateRangePreset } from "~/types/date";
import type { SelectOption } from "./ui/Select.vue";

const period = defineModel<DateRangePreset>({ required: true });

defineProps<{
  bordered?: boolean;
}>();
</script>
<template>
  <UiSelect
    v-model="period"
    :trigger-aria-label="$t('selectThePeriod')"
    :options="
      DATE_RANGE_PRESETS.map<SelectOption>((period) => ({
        label: $t(`periodPresets.${period}`),
        value: period,
      }))
    "
    :bordered="bordered"
  />
</template>
