<script setup lang="ts">
import type { PeriodPreset } from "~/constants/api";
import type { TransactionStatus } from "~/types/transactions";
import TransactionStatusSelect from "./TransactionStatusSelect.vue";

const PAGE_SIZE = 10;

const page = ref(1);

const searchTerm = ref<string>("");

const debouncedSearchTerm = refDebounced(searchTerm, 200);

const status = ref<TransactionStatus | null>(null);

const query = computed(() => ({
  page: page.value,
  page_size: PAGE_SIZE,
  search: debouncedSearchTerm.value || undefined,
  status: status.value || undefined,
}));

const { data, refresh, pending } = useApi("/api/transactions", {
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

const { formatAsShortDateWithYear } = useDateFormatter();

const { formatAsMoney } = useMoneyFormatter();

const { groupState, isSelected, toggleSelection, selectedCount } =
  useCheckboxGroup(transactions);
</script>
<template>
  <UiCard class="min-h-198.5" :title="$t('transactions')" :loading="pending">
    <template #headerEnd>
      <button class="button" :disabled="!groupState">
        <Icon name="mdi-download" />
        <span>
          {{ $t("downloadReceipt", selectedCount) }}
          <span v-if="selectedCount > 1">({{ selectedCount }})</span>
        </span>
      </button>
      <TransactionStatusSelect v-model="status" />
      <UiSearchBox
        v-model="searchTerm"
        :placeholder="$t('searchForTransactions')"
      />
    </template>
    <div class="-mx-6 overflow-x-auto" v-if="transactions.length">
      <table class="table">
        <thead class="bg-gray-700">
          <tr class="text-left">
            <th class="sticky left-0 w-16 bg-gray-700">
              <div class="flex justify-center">
                <UiCheckbox v-model="groupState" />
              </div>
            </th>
            <th>{{ $t("description") }}</th>
            <th>{{ $t("date") }}</th>
            <th>{{ $t("amount") }}</th>
            <th>{{ $t("status") }}</th>
            <th class="w-28">{{ $t("actions") }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            :data-checked="isSelected(transaction.id) || undefined"
            class="group transition-colors data-checked:bg-gray-700 not-data-checked:[&:has(.checkbox:hover)]:bg-gray-900"
          >
            <td
              class="sticky left-0 w-16 bg-gray-800 transition-colors group-data-checked:bg-gray-700 group-not-data-checked:[&:has(.checkbox:hover)]:bg-gray-900"
            >
              <div class="flex justify-center">
                <UiCheckbox
                  class="checkbox"
                  :model-value="isSelected(transaction.id)"
                  @update:model-value="toggleSelection(transaction.id)"
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
              {{ formatAsShortDateWithYear(transaction.datetime) }}
            </td>
            <td class="font-semibold text-white">
              {{ formatAsMoney(transaction.amount) }}
            </td>
            <td><OverviewTransactionStatus :status="transaction.status" /></td>
            <td class="py-2">
              <UiDropdown
                :items="[
                  {
                    label: $t('viewDetails'),
                    icon: 'mdi-eye',
                    action: () => {
                      /* Not implemented for the demo */
                    },
                  },
                  {
                    label: $t('downloadReceipt'),
                    icon: 'mdi-download',
                    action: () => {
                      /* Not implemented for the demo */
                    },
                  },
                ]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else-if="debouncedSearchTerm"
      class="mt-6 flex flex-col items-center gap-6"
    >
      <i18n-t tag="span" keypath="noTransactionsFoundForTerm">
        <template #term>
          <b class="text-white">{{ debouncedSearchTerm }}</b>
        </template>
      </i18n-t>
      <div class="flex gap-2">
        <button class="button" @click="searchTerm = ''">
          {{ $t("clearSearch") }}
        </button>
        <button v-if="status" class="button" @click="status = null">
          {{ $t("showAllStatuses") }}
        </button>
      </div>
    </div>
    <template #footer v-if="data">
      <UiPagination
        :total="data.meta.total"
        :per-page="PAGE_SIZE"
        v-model:page="page"
      />
    </template>
  </UiCard>
</template>
