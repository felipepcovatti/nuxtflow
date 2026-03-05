<script setup lang="ts">
const { data } = useFetch("/api/transactions");
const transactions = computed(() => data.value?.data.transactions || []);

const { formatAsDate } = useDateTimeFormatter();

const { formatAsMoney } = useMoneyFormatter();
</script>
<template>
  <UiCard>
    <header class="flex justify-between">
      <div>{{ $t("last30Days") }}</div>
      <UiSearchBox />
    </header>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr class="text-left">
            <th></th>
            <th>{{ $t("transaction") }}</th>
            <th>{{ $t("date") }}</th>
            <th class="tabular-nums">{{ $t("amount") }}</th>
            <th>{{ $t("status") }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="hover:bg-gray-900"
          >
            <td>
              <CheckboxRoot>
                <CheckboxIndicator />
              </CheckboxRoot>
            </td>
            <td class="text-white">
              <i18n-t :keypath="`transactionDescription.${transaction.type}`">
                <template #actor>
                  <span class="font-semibold">{{ transaction.actor }}</span>
                </template>
              </i18n-t>
            </td>
            <td>
              {{ formatAsDate(transaction.date) }}
            </td>
            <td class="font-semibold text-white">
              {{ formatAsMoney(transaction.amount) }}
            </td>
            <td><OverviewTransactionStatus :status="transaction.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiCard>
</template>
