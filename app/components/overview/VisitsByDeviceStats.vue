<script lang="ts" setup>
import { DEVICES } from "~/constants/visits";
import type { DeviceVisits } from "~/types/visits";

defineProps<{
  stats?: DeviceVisits;
  totalVisits: number;
}>();

const { formatAsCompactNumber } = useNumberFormatter();
</script>
<template>
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
      <template v-if="stats">
        <div class="section-title">
          {{
            getPercentage({
              value: stats[device.id],
              total: totalVisits,
            })
          }}
        </div>
        <div>
          {{ formatAsCompactNumber(stats[device.id]) }}
        </div>
      </template>
    </div>
  </div>
</template>
