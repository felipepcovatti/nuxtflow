<script lang="ts" setup>
import type { TransactionStatus } from "~/types/transactions";

const props = defineProps<{
  status: TransactionStatus;
}>();

const colorsByStatus: Record<TransactionStatus, string> = {
  completed: "bg-green-900 text-green-300",
  pending: "bg-yellow-900 text-yellow-300",
  in_progress: "bg-pink-900 text-pink-300",
  cancelled: "bg-red-900 text-red-300",
};
</script>
<template>
  <div
    :data-status="props.status"
    :class="[
      'inline-flex rounded-lg px-2.5 py-0.75 text-xs font-semibold whitespace-nowrap',
      colorsByStatus[props.status],
    ]"
  >
    {{ $t(`transactionStatuses.${props.status}`) }}
  </div>
</template>
