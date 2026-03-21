<script setup lang="ts">
import type { PeriodPreset } from "~/constants/api";
const PAGE_SIZE = 10;
const period = ref<PeriodPreset>("30D");

const page = ref(1);

const searchTerm = ref();

const debouncedSearchTerm = refDebounced(searchTerm, 200);

const query = computed(() => ({
  period: period.value,
  page: page.value,
  page_size: PAGE_SIZE,
  search: debouncedSearchTerm.value,
}));

const { data, refresh } = useFetch("/api/transactions", {
  query,
  watch: false,
});

watch(query, (query, { page: previousPage }) => {
  const samePage = previousPage === query.page;
  if (samePage) {
    groupState.value = false;
  }
  if (query.page !== 1 && samePage) {
    page.value = 1;
  } else {
    refresh();
  }
});

const transactions = computed(() => data.value?.data || []);

const { formatDate } = useDateFormatter();

const { formatAsMoney } = useMoneyFormatter();

const { groupState, isSelected, toggle } = useCheckboxGroup(transactions);
</script>
<template>
  <UiCard class="min-h-198.5">
    <header class="flex justify-between">
      <PeriodSelect v-model="period" />
      <UiSearchBox v-model="searchTerm" />
    </header>
    <div class="-mx-6 overflow-x-auto" v-if="transactions.length">
      <table class="w-full table-fixed">
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
              {{ formatDate(transaction.datetime) }}
            </td>
            <td class="font-semibold text-white">
              {{ formatAsMoney(transaction.amount) }}
            </td>
            <td><OverviewTransactionStatus :status="transaction.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mt-6 flex flex-col items-center gap-6">
      <div>
        {{ $t("No transactions found") }} for "{{ debouncedSearchTerm }}" in the
        {{ $t("dataPeriods." + period).toLowerCase() }}.
      </div>
      <button class="button" @click="searchTerm = ''">
        {{ "Clear search" }}
      </button>
    </div>
    <template v-if="transactions.length && data" #footer>
      <UiPagination
        :total="data.meta.total"
        :per-page="PAGE_SIZE"
        v-model:page="page"
      />
    </template>
  </UiCard>
</template>
