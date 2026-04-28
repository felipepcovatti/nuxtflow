<script setup lang="ts">
import type { Country } from "~/types/visits";

defineProps<{
  totalVisits: number;
  countries: Country[];
}>();
</script>
<template>
  <div class="flex flex-col gap-6">
    <div
      v-for="country in countries"
      :key="country.country"
      class="flex items-center gap-3"
    >
      <Icon :name="country.icon" />
      <div class="w-40 truncate text-white">
        {{ country.name }}
      </div>
      <div class="flex flex-1 rounded-md bg-gray-700">
        <div
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
</template>
