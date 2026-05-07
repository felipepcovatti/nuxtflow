<script lang="ts" setup>
const props = defineProps<{
  percentage: number;
  inverted?: boolean;
}>();

const { arrowIcon, color, percentage } = useGrowthPercentage(
  () => props.percentage,
  {
    invertedSentiment: props.inverted,
  },
);
</script>

<template>
  <span :style="{ color }" class="text-sm">
    <Icon v-if="arrowIcon" :name="arrowIcon" class="translate-y-0.5" />
    <span class="font-semibold">
      {{ percentage }}
    </span>
  </span>
</template>
