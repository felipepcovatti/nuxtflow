<script setup lang="ts">
import type { DataPeriod } from "~/constants/api";

const period = ref<DataPeriod>("7D");

const { data } = useFetch("/api/revenue/products", {
  query: {
    period,
  },
});

const revenues = computed(() => data.value?.data.revenues.slice(0, 10) || []);

const { formatAsMoney } = useMoneyFormatter();

const total = computed(() =>
  formatAsMoney(data.value?.data.total_revenue || 0),
);
</script>
<template>
  <UiCard
    :title="total"
    :subtitle="$t('products.topRevenue')"
    class="min-h-120"
  >
    <template #header-end>
      <UiGrowthPercentage
        :percentage="data?.data.total_revenue_growth_percentage || 0"
      />
    </template>
    <div class="divide-y divide-gray-700">
      <div
        v-for="revenue in revenues"
        :key="revenue.product.id"
        class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-3"
      >
        <NuxtImg
          :src="`/images/products/${revenue.product.slug}.png`"
          width="40"
          height="40"
          :alt="revenue.product.name"
        />
        <div>
          <div class="truncate font-semibold text-white">
            {{ revenue.product.name }}
          </div>
          <div class="truncate text-xs">
            {{ $t(`departments.${revenue.product.department}`) }}/{{
              $t(`categories.${revenue.product.category}`)
            }}
          </div>
        </div>
        <div class="ml-auto font-semibold text-white">
          {{ formatAsMoney(revenue.revenue) }}
        </div>
      </div>
    </div>
    <template #footer>
      <PeriodSelect v-model="period" />
    </template>
  </UiCard>
</template>
