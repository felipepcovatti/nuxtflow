<script lang="ts" setup>
import type { TransactionStatus } from "~/types/transactions";

defineProps<{
  status: TransactionStatus;
}>();
</script>
<template>
  <div
    :data-status="status"
    class="inline-flex rounded-lg px-2.5 py-0.75 text-xs font-semibold whitespace-nowrap"
  >
    {{ $t(`transactionStatuses.${status}`) }}
  </div>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  &[data-status="completed"] {
    @apply bg-green-900 text-green-300;
  }
  &[data-status="pending"] {
    @apply bg-yellow-900 text-yellow-300;
  }
  &[data-status="in_progress"] {
    @apply bg-pink-900 text-pink-300;
  }
  &[data-status="cancelled"] {
    @apply bg-red-900 text-red-300;
  }
}
</style>
