<script lang="ts" setup>
import type { TransactionStatus } from "~/types/transactions";
import type { SelectOption } from "../ui/Select.vue";
import { TRANSACTION_STATUSES } from "~/constants/transactions";

type TransactionStatusSelectValue = TransactionStatus | "all";

const model = defineModel<TransactionStatus | null>({ required: true });

const options = computed<SelectOption<TransactionStatusSelectValue>[]>(() => [
  {
    label: $t("allStatuses"),
    value: "all",
  },
  ...TRANSACTION_STATUSES.map((status) => ({
    label: $t("transactionStatuses." + status),
    value: status,
  })),
]);

const selectedOption = computed<TransactionStatusSelectValue>({
  get: () => model.value ?? "all",
  set: (value) => {
    model.value = value === "all" ? null : value;
  },
});
</script>
<template>
  <UiSelect
    v-slot="{ selected }"
    v-model="selectedOption"
    :options="options"
    bordered
    :trigger-aria-label="$t('filterByStatus')"
    @update:model-value=""
  >
    <template v-if="selected.value !== 'all'">
      {{ $t("status") }}: {{ selected.label }}
    </template>
  </UiSelect>
</template>
