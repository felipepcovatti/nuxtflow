import type {
  TransactionStatus,
  TransactionsQuery,
} from "~/types/transactions";

const PAGE_SIZE = 10;

export function useTransactions() {
  const page = ref(1);
  const status = ref<TransactionStatus | null>(null);
  const searchTerm = ref<string>("");
  const debouncedSearchTerm = refDebounced(searchTerm, 200);

  const searchQuery = computed(() => ({
    search: debouncedSearchTerm.value || undefined,
    status: status.value || undefined,
  }));

  const query = computed<TransactionsQuery>(() => ({
    page_size: PAGE_SIZE,
    page: page.value,
    ...searchQuery.value,
  }));

  const { data, refresh, pending } = useApi("/api/transactions", {
    query,
    watch: false,
  });

  const transactions = computed(() => data.value?.data || []);

  const total = computed(() => data.value?.meta.total || 0);

  const { groupState, isSelected, toggleSelection, selectedCount } =
    useCheckboxGroup(transactions);

  function unselectAllAndRefresh() {
    groupState.value = false;
    refresh();
  }

  watch(searchQuery, () => {
    if (page.value === 1) {
      unselectAllAndRefresh();
    } else {
      page.value = 1;
    }
  });

  watch(page, () => {
    unselectAllAndRefresh();
  });

  return {
    page,
    pageSize: PAGE_SIZE,
    transactions,
    total,
    pending,
    searchTerm,
    status,
    debouncedSearchTerm,
    groupState,
    isSelected,
    toggleSelection,
    selectedCount,
  };
}
