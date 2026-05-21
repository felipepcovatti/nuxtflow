<script setup lang="ts">
import { VisSingleContainer, VisTooltip, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";
import type { Country } from "~/types/visits";

defineProps<{
  countries: Country[];
}>();

const { tooltipTriggers } = useVisitsMap();
</script>
<template>
  <div
    class="flex h-(--map-height) [--map-height:40vw] @5xl:[--map-height:29.5rem]"
  >
    <ClientOnly>
      <VisSingleContainer
        :data="{ areas: countries }"
        height="var(--map-height)"
      >
        <VisTopoJSONMap
          :topojson="WorldMapTopoJSON"
          :area-color="visitsMapCountryColorGetter"
          :area-id="visitsMapCountryCodeGetter"
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
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  :deep([data-selector="tooltip"]) {
    @apply tooltip;
  }
}
</style>
