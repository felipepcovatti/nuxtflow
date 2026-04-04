<script lang="ts" setup>
import type { Metric } from "~/types/stats";

const props = defineProps<{
  icon: string;
  title: string;
  data: Metric;
  money?: boolean;
  invertedSentiment?: boolean;
}>();

const { formatAsCompactMoney } = useMoneyFormatter();
const { formatAsNumber } = useNumberFormatter();

const total = computed(() => {
  return props.money
    ? formatAsCompactMoney(props.data.last_30_days)
    : formatAsNumber(props.data.last_30_days);
});

const growthPercentage = computed(() =>
  calculateGrowth({
    before: props.data.previous_90_days_average,
    now: props.data.last_30_days,
  }),
);
</script>
<template>
  <UiCard>
    <div class="flex flex-col gap-2">
      <Icon :name="icon" size="1.25rem" />
      {{ title }}
      <div class="section-title">
        {{ total }}
      </div>
      <div class="leading-5">
        <GrowthPercentage
          :percentage="growthPercentage"
          :inverted="invertedSentiment"
        />
        <span class="ml-1">
          {{ $t("vsLast3Months") }}
        </span>
      </div>
    </div>
  </UiCard>
</template>
