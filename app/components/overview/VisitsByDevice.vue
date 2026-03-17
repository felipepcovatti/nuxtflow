<script setup lang="ts">
import { VisStackedBar, VisXYContainer } from "@unovis/vue";
import type { PeriodPreset } from "~/constants/api";
import type { DevicesChartRecord } from "~/types/chart";
import type { Device } from "~/types/visits";

const period = ref<PeriodPreset>("7D");

const { data, pending } = useFetch("/api/visits/devices", {
  query: { period },
});
const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-700)",
  "var(--color-orange-300)",
  "var(--color-teal-400)",
];

const hoveredDeviceIndex = ref<number | null>(null);

const visits = computed(() =>
  (data.value?.data.visits || []).toSorted((a, b) => b.visits - a.visits),
);

const devicesRecords = computed(() =>
  mapVisitsByDeviceToChartData(visits.value),
);

const xGetter = ({ index }: DevicesChartRecord) => index;
const yGetters = computed(() => {
  return (visits.value || []).map(
    (device) => (record: DevicesChartRecord) => record[device.device],
  );
});

function getVisitsPercentage(visits: number) {
  if (!data.value?.data.total_visits) return "";
  return ((visits / data.value.data.total_visits) * 100).toFixed(1) + "%";
}

const { formatAsCompactNumber } = useNumberFormatter();

const ICON_BY_DEVICE: Record<Device, string> = {
  desktop: "flowbite:desktop-pc-solid",
  mobile: "flowbite:mobile-phone-solid",
  tablet: "flowbite:tablet-solid",
};
</script>

<template>
  <UiCard
    :title="formatAsCompactNumber(data?.data.total_visits ?? 0)"
    :subtitle="$t('visitsByDevice')"
    class="[--bar-height:1.25rem]"
  >
    <template #header-end>
      <GrowthPercentage
        :percentage="data?.data.total_visits_growth_percentage || 0"
      />
    </template>
    <UiSpinner v-if="pending" class="h-(--map-height)" />
    <template v-else-if="data">
      <div class="flex flex-wrap justify-between gap-3">
        <div v-for="visit in visits" :key="visit.device">
          <header class="flex items-center gap-1">
            <Icon :name="ICON_BY_DEVICE[visit.device]" />
            <div class="text-white">
              {{ $t(`devices.${visit.device}`) }}
            </div>
          </header>
          <div class="heading-2">
            {{ getVisitsPercentage(visit.visits) }}
          </div>
          <div>
            {{ formatAsCompactNumber(visit.visits) }}
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
          v-for="(visit, index) in visits"
          :key="visit.device"
          class="cursor-default"
          @mouseenter="hoveredDeviceIndex = index"
          @mouseleave="hoveredDeviceIndex = null"
        >
          <ChartLegendItem
            :color="COLORS[index] ?? ''"
            :label="$t(`devices.${visit.device}`)"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <PeriodSelect v-model="period" />
      <NuxtLink>
        {{ $t("usersReport") }}
      </NuxtLink>
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
