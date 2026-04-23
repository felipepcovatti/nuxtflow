<script lang="ts" setup>
import type { TransactionStatus } from "~/types/transactions";

const props = defineProps<{
  status: TransactionStatus;
}>();
</script>
<template>
  <div
    :data-status="props.status"
    :class="[
      'inline-flex rounded-lg px-2.5 py-0.75 text-xs font-semibold whitespace-nowrap',
      'data-[status=completed]:bg-green-900 data-[status=completed]:text-green-300',
      'data-[status=pending]:bg-yellow-900 data-[status=pending]:text-yellow-300',
      'data-[status=in\\_progress]:bg-pink-900 data-[status=in\\_progress]:text-pink-300',
      'data-[status=cancelled]:bg-red-900 data-[status=cancelled]:text-red-300',
    ]"
  >
    {{ $t(`transactionStatuses.${props.status}`) }}
  </div>
</template>
