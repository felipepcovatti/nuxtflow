<script setup lang="ts">
import { VisStackedBar, VisXYContainer } from "@unovis/vue";
import type { DevicesChartRecord } from "~/types/chart";
import type { Device, DevicesVisitRecord } from "~/types/visits";

const { data, pending } = useFetch("/api/visits/devices");
const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];

const hoveredDeviceIndex = ref<number | null>(null);

const devices = computed(() =>
  (data.value?.data.devices || []).toSorted((a, b) => b.visits - a.visits),
);

const devicesRecords = computed(() =>
  mapVisitsByDeviceToChartData(devices.value),
);

const xGetter = ({ index }: DevicesChartRecord) => index;
const yGetters = computed(() => {
  return (devices.value || []).map(
    (device) => (record: DevicesChartRecord) => record[device.name],
  );
});

function getVisitsPercentage(visits: number) {
  if (!data.value?.data.total_visits) return "";
  return ((visits / data.value.data.total_visits) * 100).toFixed(0) + "%";
}

const { arrowIcon, evolution, color } = useBalanceEvolution(() => ({
  before: data.value?.data.previous_total_visits ?? 0,
  now: data.value?.data.total_visits ?? 0,
}));

const { formatAsCompactNumber } = useNumberFormatter();

const ICON_BY_DEVICE: Record<Device, string> = {
  desktop: "flowbite:desktop-pc-solid",
  mobile: "flowbite:mobile-phone-solid",
  tablet: "flowbite:tablet-solid",
};

const { t } = useI18n();
</script>

<template>
  <UiCard
    :title="formatAsCompactNumber(data?.data.total_visits ?? 0)"
    :subtitle="t('visitsByDevice')"
    class="[--bar-height:1.25rem]"
  >
    <template #header-end>
      <div :style="{ color }" class="flex items-center">
        <Icon v-if="arrowIcon" :name="arrowIcon" />
        <span class="text-sm font-semibold"> {{ evolution.result }} </span>
      </div>
    </template>
    <UiSpinner v-if="pending" class="h-(--map-height)" />
    <template v-else-if="data">
      <div class="flex flex-wrap justify-between gap-3">
        <div v-for="device in devices" :key="device.name">
          <header class="flex items-center gap-1">
            <Icon :name="ICON_BY_DEVICE[device.name]" />
            <div class="text-white">
              {{ $t(`device.${device.name}`) }}
            </div>
          </header>
          <div class="heading-2">{{ getVisitsPercentage(device.visits) }}</div>
          <div>
            {{ formatAsCompactNumber(device.visits) }}
          </div>
        </div>
      </div>
      <VisXYContainer
        :data="devicesRecords"
        height="var(--bar-height)"
        class="overflow-clip rounded"
      >
        <VisStackedBar
          :x="xGetter"
          :y="yGetters"
          orientation="horizontal"
          :color="(_: DevicesChartRecord, index: number) => COLORS[index]"
        />
      </VisXYContainer>
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
        <div
          v-for="(device, index) in devices"
          :key="device.name"
          class="cursor-default"
          @mouseenter="hoveredDeviceIndex = index"
          @mouseleave="hoveredDeviceIndex = null"
        >
          <ChartLegendItem
            :color="COLORS[index] ?? ''"
            :label="$t(`device.${device.name}`)"
          />
        </div>
      </div>
    </template>
  </UiCard>
</template>
<style scoped>
div {
  :deep([data-selector="stacked-bar"]) {
    border-radius: 10px !important;
    overflow: hidden;
  }
}
</style>
<i18n lang="json">
{
  "en": {
    "visitsByDevice": "Visits by device"
  }
}
</i18n>
