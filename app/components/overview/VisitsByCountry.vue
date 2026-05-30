<script setup lang="ts">
const { countries, pending, period, totalVisits, highestVisitCountries } =
  useCountries();

const { formatAsNumber } = useNumberFormatter();
</script>

<template>
  <UiCard
    :loading="pending"
    :title="totalVisits !== undefined ? formatAsNumber(totalVisits) : ''"
    :subtitle="$t('visitsByCountry')"
    class="@5xl:min-h-314.75"
    :link="{ label: $t('viewCountryReport'), to: '/visits-report' }"
  >
    <template #headerEnd>
      <PeriodSelect v-model="period" bordered />
    </template>
    <VisitsMap :countries="countries" />
    <OverviewVisitsByCountryList
      :countries="highestVisitCountries"
      :total-visits="totalVisits || 0"
    />
  </UiCard>
</template>
