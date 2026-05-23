import type { Ref } from "vue";

export const useCheckboxGroup = <T extends { id: string }>(items: Ref<T[]>) => {
  const selectedSet = ref(new Set<string>());

  const isSelected = (id: string) => selectedSet.value.has(id);

  const toggleSelection = (id: string) => {
    if (selectedSet.value.has(id)) {
      selectedSet.value.delete(id);
    } else {
      selectedSet.value.add(id);
    }
  };
  const selectedCount = computed(() => selectedSet.value.size);

  const groupState = computed<boolean | "indeterminate">({
    get: () => {
      const selected = selectedCount.value;
      const total = items.value.length;
      if (total === 0 || selected === 0) return false;
      if (selected === total) return true;
      return "indeterminate";
    },
    set: (state) => {
      if (state === true) {
        selectedSet.value = new Set(items.value.map((item) => item.id));
      } else {
        selectedSet.value.clear();
      }
    },
  });

  watch(items, () => selectedSet.value.clear());

  return {
    isSelected,
    toggleSelection,
    groupState,
    selectedCount,
  };
};
