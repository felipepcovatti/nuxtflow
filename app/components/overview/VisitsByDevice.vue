<script setup lang="ts">
import type { DateRangePreset } from "~/types/date";
import { DEVICES } from "~/constants/visits";

const period = ref<DateRangePreset>("7D");

const { data, pending } = useApi("/api/visits/devices", {
  query: { period },
});

const visits = computed(() => {
  const visits = data.value?.data.visits;
  return visits ? [visits] : [];
});

const { formatAsCompactNumber } = useNumberFormatter();
</script>

<template>
  <UiCard
    :loading="pending"
    :title="formatAsCompactNumber(data?.data.total_visits ?? 0)"
    :subtitle="$t('visitsByDevice')"
    :link="{ label: $t('viewUserReport'), to: 'user-report' }"
  >
    <template v-if="data" #headerEnd>
      <GrowthPercentage
        :percentage="data.data.total_visits_growth_percentage"
      />
    </template>
    <OverviewVisitsByDeviceStats
      :stats="data?.data.visits"
      :total-visits="data?.data.total_visits ?? 0"
    />
    <UiChart
      type="horizontal-stacked-bar"
      hide-axis
      :height="20"
      :group-records="visits"
      :tooltip-title-getter="() => $t('visits')"
      :items="
        DEVICES.map((device) => ({
          id: device.id,
          label: $t(`devices.${device.id}`),
          color: device.color,
        }))
      "
    />
    <template #footer>
      <PeriodSelect v-model="period" />
    </template>
  </UiCard>
</template>
