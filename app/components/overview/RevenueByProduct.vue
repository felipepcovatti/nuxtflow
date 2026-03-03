<script setup lang="ts">
import { usePercentage } from "~/composables/usePercentage";

const { t } = useI18n({ useScope: "global" });

const { data } = useFetch("/api/revenue/products");

const products = computed(() => data.value?.data.products || []);

const { arrowIcon, color, percentage } = usePercentage(
  () => data.value?.data.total_growth_percentage ?? 0,
);

const { formatAsMoney } = useMoneyFormatter();
</script>
<template>
  <UiCard
    :title="formatAsMoney(23423)"
    :subtitle="t('revenueTopProducts')"
    class="min-h-120"
  >
    <template #header-end>
      <Icon v-if="arrowIcon" :name="arrowIcon" />
      {{ percentage }}
    </template>
    <div
      v-for="product in products"
      :key="product.product.id"
      class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2"
    >
      <NuxtImg :src="product.product.image_url" width="40" height="40" />
      <div>
        <div class="truncate font-semibold text-white">
          {{ product.product.name }}
        </div>
        <div class="truncate text-xs">
          {{ t(`department.${product.department}`) }}/{{
            t(`category.${product.category}`)
          }}
        </div>
      </div>
      <div class="ml-auto font-semibold text-white">
        {{ formatAsMoney(product.revenue) }}
      </div>
    </div>
  </UiCard>
</template>
<i18n lang="json">
{
  "en": {
    "revenueTopProducts": "Top products by revenue"
  }
}
</i18n>
