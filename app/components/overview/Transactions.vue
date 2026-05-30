<script setup lang="ts">
const { formatAsShortDateWithYear } = useDateFormatter();

const { formatAsMoney } = useMoneyFormatter();

const {
  page,
  searchTerm,
  pageSize,
  pending,
  total,
  transactions,
  status,
  debouncedSearchTerm,
  groupState,
  isSelected,
  toggleSelection,
  selectedCount,
} = useTransactions();
</script>
<template>
  <UiCard class="min-h-198.5" :title="$t('transactions')" :loading="pending">
    <template #headerEnd>
      <button class="button" :disabled="!groupState">
        <Icon name="mdi-download" />
        <span>
          {{ $t("downloadReceipt", { count: selectedCount }) }}
        </span>
      </button>
      <OverviewTransactionStatusSelect v-model="status" />
      <UiSearchBox
        v-model="searchTerm"
        :placeholder="$t('searchByTransactionDescription')"
      />
    </template>
    <div v-if="transactions.length" class="-mx-6 overflow-x-auto">
      <table class="table w-200 lg:w-full">
        <thead class="bg-gray-700">
          <tr class="text-left">
            <th scope="col" class="sticky left-0 w-16 bg-gray-700">
              <div class="flex justify-center">
                <UiCheckbox
                  v-model="groupState"
                  :aria-label="
                    $t('selectTransactionsInCurrentPage', {
                      count: transactions.length,
                    })
                  "
                />
              </div>
            </th>
            <th scope="col" class="w-60 lg:w-auto">{{ $t("description") }}</th>
            <th scope="col">{{ $t("date") }}</th>
            <th scope="col">{{ $t("amount") }}</th>
            <th scope="col">{{ $t("status") }}</th>
            <th scope="col" class="w-28">{{ $t("actions") }}</th>
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
                  :aria-label="
                    $t('selectTransaction', {
                      description: transaction.description,
                    })
                  "
                  @update:model-value="toggleSelection(transaction.id)"
                />
              </div>
            </td>
            <td class="text-white">
              {{ transaction.description }}
            </td>
            <td>
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
    <template v-if="total" #footer>
      <UiPagination v-model:page="page" :total="total" :per-page="pageSize" />
    </template>
  </UiCard>
</template>
