<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  title: string;
  currentMonthTotal: number;
  lastThreeMonthsAverage: number;
  money?: boolean;
  invertedSentiment?: boolean;
}>();

const { color, evolution, arrowIcon } = useBalanceEvolution(
  () => ({
    before: props.lastThreeMonthsAverage,
    now: props.currentMonthTotal,
  }),
  {
    invertedSentiment: props.invertedSentiment,
  },
);

const { formatAsCompactMoney } = useMoneyFormatter();
const { formatAsNumber } = useNumberFormatter();

const total = computed(() => {
  return props.money
    ? formatAsCompactMoney(props.currentMonthTotal)
    : formatAsNumber(props.currentMonthTotal);
});

const { t } = useI18n();
</script>
<template>
  <UiCard>
    <div class="flex flex-col gap-2">
      <Icon :name="icon" size="1.25rem" />
      {{ title }}
      <div class="heading-2">
        {{ total }}
      </div>
      <div class="leading-5">
        <span :style="{ color }">
          <Icon v-if="arrowIcon" :name="arrowIcon" class="translate-y-0.5" />
          <span class="text-sm font-semibold">
            {{ evolution.result }}
          </span>
        </span>
        <span class="ml-1">
          {{ t("vsLast3Months") }}
        </span>
      </div>
    </div>
  </UiCard>
</template>
<i18n lang="json">
{
  "en": {
    "vsLast3Months": "vs last 3 months"
  }
}
</i18n>
