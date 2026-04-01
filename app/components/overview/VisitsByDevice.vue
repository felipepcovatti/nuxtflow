<script setup lang="ts">
import type { PeriodPreset } from "~/constants/api";
import type { Device } from "~/types/visits";

const period = ref<PeriodPreset>("7D");

const { data, pending } = useApi("/api/visits/devices", {
  query: { period },
});

const visits = computed(() => {
  const visits = data.value?.data.visits;
  return visits ? [visits] : [];
});

const DEVICES: ReadonlyArray<{ id: Device; color: string; icon: string }> = [
  {
    id: "desktop",
    color: "var(--color-primary-700)",
    icon: "flowbite:desktop-pc-solid",
  },
  {
    id: "mobile",
    color: "var(--color-orange-300)",
    icon: "flowbite:mobile-phone-solid",
  },
  {
    id: "tablet",
    color: "var(--color-teal-400)",
    icon: "flowbite:tablet-solid",
  },
];

function getVisitsPercentage(visits: number) {
  if (!data.value?.data.total_visits) return "";
  return ((visits / data.value.data.total_visits) * 100).toFixed(1) + "%";
}

const { formatAsCompactNumber } = useNumberFormatter();
</script>

<template>
  <UiCard
    :title="formatAsCompactNumber(data?.data.total_visits ?? 0)"
    :subtitle="$t('visitsByDevice')"
    :link="{ label: $t('viewUserReport'), to: 'user-report' }"
  >
    <template #headerEnd>
      <GrowthPercentage
        :percentage="data?.data.total_visits_growth_percentage || 0"
      />
    </template>
    <UiSpinner v-if="pending" class="h-(--map-height)" />
    <template v-else-if="data">
      <div class="flex flex-wrap justify-between gap-3">
        <div v-for="device in DEVICES" :key="device.id">
          <header class="flex items-center gap-1">
            <Icon :name="device.icon" />
            <div class="text-white">
              {{ $t(`devices.${device.id}`) }}
            </div>
          </header>
          <div class="heading-2">
            {{ getVisitsPercentage(data.data.visits[device.id]) }}
          </div>
          <div>
            {{ formatAsCompactNumber(data.data.visits[device.id]) }}
          </div>
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
    </template>
    <template #footer>
      <PeriodSelect v-model="period" />
    </template>
  </UiCard>
</template>
