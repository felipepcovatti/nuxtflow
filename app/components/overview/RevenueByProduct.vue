<script setup lang="ts">
import type { DateRangePreset } from "~/types/date";

const period = ref<DateRangePreset>("7D");

const { data, pending } = useApi("/api/revenue/products", {
  query: {
    period,
  },
});

const revenues = computed(() => data.value?.data.revenues.slice(0, 10) || []);

const { formatAsMoney } = useMoneyFormatter();
</script>
<template>
  <UiCard
    :loading="pending"
    :title="data ? formatAsMoney(data.data.total_revenue) : ''"
    :subtitle="$t('productsByRevenue')"
    class="min-h-215.5"
    :link="{
      label: $t('viewProductReport'),
      to: '/product-report',
    }"
  >
    <template v-if="data" #headerEnd>
      <GrowthPercentage
        :percentage="data.data.total_revenue_growth_percentage"
      />
    </template>
    <div class="divide-y divide-gray-700">
      <div
        v-for="revenue in revenues"
        :key="revenue.product.id"
        class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-3"
      >
        <Icon name="mdi:image" size="2.5rem" />
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
