<script setup lang="ts">
import { VisSingleContainer, VisTooltip, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";

const {
  countries,
  pending,
  period,
  totalVisits,
  highestVisitCountries,
  tooltipTriggers,
  countryCodeGetter,
  countryColorGetter,
} = useCountries();

const { formatAsNumber } = useNumberFormatter();
</script>

<template>
  <UiCard
    :loading="pending"
    :title="totalVisits !== undefined ? formatAsNumber(totalVisits) : ''"
    :subtitle="$t('visitsByCountry')"
    class="min-h-314.75"
    :link="{ label: $t('viewCountryReport'), to: '/visits-report' }"
  >
    <template #headerEnd>
      <PeriodSelect v-model="period" bordered />
    </template>
    <div
      ref="mapWrapper"
      class="flex h-(--map-height) [--map-height:40vw] @5xl:[--map-height:29.5rem]"
    >
      <ClientOnly>
        <VisSingleContainer
          :data="{ areas: countries }"
          height="var(--map-height)"
        >
          <VisTopoJSONMap
            :topojson="WorldMapTopoJSON"
            :area-color="countryColorGetter"
            :area-id="countryCodeGetter"
            :zoom-extent="[1, 6]"
            :duration="200"
          />
          <VisTooltip
            :triggers="tooltipTriggers"
            :attributes="{ 'data-selector': 'tooltip' }"
            vertical-placement="bottom"
            :vertical-shift="16"
          />
        </VisSingleContainer>
      </ClientOnly>
    </div>
    <div class="flex flex-col gap-6">
      <div
        v-for="country in highestVisitCountries"
        :key="country.country"
        class="flex items-center gap-3"
      >
        <Icon :name="country.icon" />
        <div class="w-40 truncate text-white">
          {{ country.name }}
        </div>
        <div class="flex flex-1 rounded-md bg-gray-700">
          <div
            v-if="totalVisits !== undefined"
            :style="{
              width: getPercentage({
                value: country.visits,
                total: totalVisits,
              }),
            }"
            class="bg-primary-700 rounded-md text-right text-xs/relaxed text-white transition-[width]"
          >
            <span class="mx-2">
              {{ country.formattedVisits }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </UiCard>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  :deep([data-selector="tooltip"]) {
    @apply tooltip;
  }
}
</style>
