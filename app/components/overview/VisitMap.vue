<script setup lang="ts">
import { VisSingleContainer, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";
import type { CountryVisitsRecord } from "~/types/visits";

const colors = [
  "var(--color-primary-200)",
  "var(--color-primary-300)",
  "var(--color-primary-400)",
  "var(--color-primary-500)",
  "var(--color-primary-600)",
  "var(--color-primary-700)",
  "var(--color-primary-800)",
  "var(--color-primary-900)",
];

const { data } = useFetch("/api/visits");

const countryGetter = ({ country }: CountryVisitsRecord) => country;

const countries = computed(() => data.value?.countries || []);

const visits = computed(() => countries.value.map(({ visits }) => visits));

const minimum = computed(() => Math.min(...visits.value));
const maximum = computed(() => Math.max(...visits.value));

function countryColorGetter({ visits }: CountryVisitsRecord) {
  const min = minimum.value;
  const max = maximum.value;
  if (visits === 0) return "var(--vis-map-feature-color)";

  const colorSteps = colors.length;

  if (max === min) return colors[Math.floor(colorSteps / 2)];

  const colorBucketSize = (max - min) / colorSteps;

  const index = Math.min(
    colorSteps - 1,
    Math.floor((visits - min) / colorBucketSize),
  );

  return colors[index];
}

const { formatAsNumber } = useNumberFormatter();

const total = computed(
  () => data.value?.total_visits && formatAsNumber(data.value.total_visits),
);

const { t } = useI18n();
</script>

<template>
  <UiCard :title="total" :subtitle="t('subtitle')">
    <VisSingleContainer :data="{ areas: countries }" :height="384">
      <VisTopoJSONMap
        :topojson="WorldMapTopoJSON"
        :area-color="countryColorGetter"
        :area-id="countryGetter"
        :zoom-factor="1.2"
      />
    </VisSingleContainer>
    <div class="flex flex-col gap-6"></div>
  </UiCard>
</template>
<style scoped>
div {
  --vis-map-feature-color: var(--color-gray-600);
  --vis-map-boundary-color: var(--color-gray-900);
}
</style>
<i18n lang="json">
{
  "en": {
    "subtitle": "Worldwide visits"
  }
}
</i18n>
