<script setup lang="ts">
const { t } = useI18n();

const { formatAsMoney } = useMoneyFormatter();
</script>
<template>
  <UiCard
    :title="formatAsMoney(23423)"
    :subtitle="t('revenueTopProducts')"
    class="min-h-120"
  >
  </UiCard>
</template>
<i18n lang="json">
{
  "en": {
    "revenueTopProducts": "Top products by revenue"
  }
}
</i18n>
