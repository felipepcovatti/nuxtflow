<script setup lang="ts">
const { data } = useFetch("/api/transactions");
const transactions = computed(() => data.value?.data.transactions || []);

const { formatAsDate } = useDateTimeFormatter();

const { formatAsMoney } = useMoneyFormatter();

const { groupState, isSelected, toggle } = useCheckboxGroup(transactions);
</script>
<template>
  <UiCard>
    <header class="flex justify-between">
      <div>{{ $t("last30Days") }}</div>
      <UiSearchBox />
    </header>
    <div class="-mx-6 overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr class="text-left">
            <th class="sticky left-0 w-16 bg-gray-700">
              <div class="flex justify-center">
                <UiCheckbox v-model="groupState" />
              </div>
            </th>
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
            class="group has-data-[state=checked]:bg-primary-700 transition-colors hover:bg-gray-700"
          >
            <td
              class="group-has-data-[state=checked]:bg-primary-700 sticky left-0 w-16 bg-gray-800 transition-colors group-hover:bg-gray-700"
            >
              <div class="flex justify-center">
                <UiCheckbox
                  :model-value="isSelected(transaction.id)"
                  @update:model-value="toggle(transaction.id)"
                />
              </div>
            </td>
            <td class="text-white">
              <i18n-t :keypath="`transactionDescription.${transaction.type}`">
                <template #actor>
                  <span class="font-semibold">{{ transaction.actor }}</span>
                </template>
              </i18n-t>
            </td>
            <td class="min-w-30">
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
    <template #footer>
      <UiPagination :total="100" :per-page="10" :page="1" />
    </template>
  </UiCard>
</template>
