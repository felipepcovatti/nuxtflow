<script setup lang="ts">
import { VisSingleContainer, VisTooltip, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";
import type { CountryVisitsRecord } from "~/types/visits";
import { TopoJSONMap } from "@unovis/ts";
import { render } from "vue";
import { MapTooltipContent, Icon } from "#components";
import type { PeriodPreset } from "~/constants/api";

const COLORS: ReadonlyArray<string> = [
  "var(--color-primary-200)",
  "var(--color-primary-300)",
  "var(--color-primary-400)",
  "var(--color-primary-500)",
  "var(--color-primary-600)",
  "var(--color-primary-700)",
  "var(--color-primary-800)",
  "var(--color-primary-900)",
];

const period = ref<PeriodPreset>("30D");

const { data, pending } = useFetch("/api/visits/countries", {
  query: {
    period,
  },
});

const countryGetter = ({ country }: CountryVisitsRecord) => country;

const visits = computed(() => data.value?.data.visits || []);

const visitsList = computed(() => visits.value.slice(0, 12));

const countryVisits = computed(() => visits.value.map(({ visits }) => visits));

const minVisits = computed(() => Math.min(...countryVisits.value));
const maxVisits = computed(() => Math.max(...countryVisits.value));

function getCountryColor({ visits }: CountryVisitsRecord) {
  const min = minVisits.value;
  const max = maxVisits.value;
  if (visits === 0) return "var(--vis-map-feature-color)";

  const colorSteps = COLORS.length;

  if (max === min) return COLORS[Math.floor(colorSteps / 2)];

  const colorBucketSize = (max - min) / colorSteps;

  const index = Math.min(
    colorSteps - 1,
    Math.floor((visits - min) / colorBucketSize),
  );

  return COLORS[index];
}

const { formatAsNumber } = useNumberFormatter();

const total = computed(
  () =>
    data.value?.data.total_visits &&
    formatAsNumber(data.value.data.total_visits),
);

const { getCountryName } = useCountryName();

const triggers = {
  [TopoJSONMap.selectors.feature]: ({
    data,
    id,
  }: {
    data?: CountryVisitsRecord;
    id: string;
  }) => {
    const tooltip = document.createElement("div");
    const content: VNode = h(MapTooltipContent, {
      title: getCountryName(id),
      label: $t("visits"),
      value: formatAsNumber(data?.visits ?? 0),
    });
    render(content, tooltip);
    return tooltip;
  },
};

function getVisitsPercentage(visits: number) {
  if (!data.value?.data.total_visits) return 0;
  return ((visits / data.value?.data.total_visits) * 100).toFixed(1) + "%";
}
</script>

<template>
  <UiCard :title="total" :subtitle="$t('visitsByCountry')">
    <template #header-end>
      <PeriodSelect v-model="period" bordered />
    </template>
    <div
      ref="mapWrapper"
      class="[--map-height:40vw] @5xl:[--map-height:29.75rem]"
    >
      <UiSpinner v-if="pending" class="h-(--map-height)" />
      <VisSingleContainer
        v-else
        :data="{ areas: visits }"
        height="var(--map-height)"
        class="h-(--map-height)"
      >
        <VisTopoJSONMap
          :topojson="WorldMapTopoJSON"
          :area-color="getCountryColor"
          :area-id="countryGetter"
          :zoom-extent="[1, 6]"
        />
        <VisTooltip
          :triggers="triggers"
          :attributes="{ 'data-selector': 'tooltip' }"
          vertical-placement="bottom"
          :vertical-shift="16"
        />
      </VisSingleContainer>
    </div>
    <div class="flex flex-col gap-6">
      <div v-for="country in visitsList" class="flex items-center gap-3">
        <Icon :name="`flag:${country.country.toLowerCase()}-4x3`" />
        <div class="w-40 truncate text-white">
          {{ getCountryName(country.country) }}
        </div>
        <div class="flex flex-1 rounded-md bg-gray-700">
          <div
            :style="{ width: getVisitsPercentage(country.visits) }"
            class="bg-primary-700 rounded-md text-right text-xs/relaxed text-white"
          >
            <span class="mx-2">
              {{ formatAsNumber(country.visits) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <NuxtLink class="button">
        {{ $t("viewFullReport") }}
        <Icon name="mdi:arrow-right" size="1.1rem" />
      </NuxtLink>
    </template>
  </UiCard>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  --vis-map-feature-color: var(--color-gray-700);
  --vis-map-boundary-color: var(--color-gray-900);
  :deep([data-selector="tooltip"]) {
    @apply tooltip;
  }
}
</style>
