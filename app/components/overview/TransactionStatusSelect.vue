<script lang="ts" setup>
import type { TransactionStatus } from "~/types/transactions";
import type { SelectOption } from "../ui/Select.vue";
import { TRANSACTION_STATUSES } from "~/constants/transaction";

type TransactionStatusSelectValue = TransactionStatus | "all";

const model = defineModel<TransactionStatus>();

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
    model.value = value === "all" ? undefined : value;
  },
});
</script>
<template>
  <UiSelect
    :options="options"
    v-model="selectedOption"
    @update:model-value=""
    bordered
    v-slot="{ selected }"
  >
    <template v-if="selected.value !== 'all'">
      {{ $t("status") }}: {{ selected.label }}
    </template>
  </UiSelect>
</template>
