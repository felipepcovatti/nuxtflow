<script setup lang="ts">
import type { DataPeriod } from "~/constants/api";
const PAGE_SIZE = 10;
const period = ref<DataPeriod>("30D");
const page = ref(1);

const { data } = useFetch("/api/transactions", {
  query: { period, pageSize: PAGE_SIZE, page },
});
const transactions = computed(() => data.value?.data || []);

const { formatAsDate } = useDateTimeFormatter();

const { formatAsMoney } = useMoneyFormatter();

const { groupState, isSelected, toggle } = useCheckboxGroup(transactions);
</script>
<template>
  <UiCard>
    <header class="flex justify-between">
      <PeriodSelect v-model="period" bordered />
      <UiSearchBox />
    </header>
    <div class="-mx-6 overflow-x-auto">
      <table class="w-full min-w-150 table-fixed">
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
              <i18n-t :keypath="`transactionDescriptions.${transaction.type}`">
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
    <template v-if="data" #footer>
      <UiPagination
        :total="data.meta.total"
        :per-page="PAGE_SIZE"
        v-model:page="page"
      />
    </template>
  </UiCard>
</template>
