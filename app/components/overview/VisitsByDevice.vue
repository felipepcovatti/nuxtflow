<script setup lang="ts">
import type { PeriodPreset } from "~/constants/api";
import { DEVICES } from "~/constants/visits";

const period = ref<PeriodPreset>("7D");

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
    <template #headerEnd v-if="data">
      <GrowthPercentage
        :percentage="data.data.total_visits_growth_percentage"
      />
    </template>
    <div class="flex flex-wrap justify-between gap-3">
      <div
        v-for="device in DEVICES"
        :key="device.id"
        class="flex min-h-21 flex-col justify-between"
      >
        <header class="flex items-center gap-1">
          <Icon :name="device.icon" />
          <div class="text-white">
            {{ $t(`devices.${device.id}`) }}
          </div>
        </header>
        <template v-if="data">
          <div class="section-title">
            {{
              getPercentage({
                value: data.data.visits[device.id],
                total: data.data.total_visits,
              })
            }}
          </div>
          <div>
            {{ formatAsCompactNumber(data.data.visits[device.id]) }}
          </div>
        </template>
      </div>
    </div>
    <UiChart
      type="horizontal-stacked-bar"
      hide-axis
      :height="20"
      :data-records="visits"
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
