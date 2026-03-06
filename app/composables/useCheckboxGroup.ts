import { computed, ref, type Ref } from "vue";

export const useCheckboxGroup = <T extends { id: string | number }>(
  items: Ref<T[]>,
) => {
  const selectedMap = reactive<Record<string, boolean>>({});

  const selectedIds = computed(() => {
    return Object.keys(selectedMap).filter((key) => selectedMap[key] === true);
  });

  const isSelected = (id: string) => selectedMap[id] === true;

  const toggleItem = (id: string) => {
    if (selectedMap[id] === true) {
      delete selectedMap[id];
    } else {
      selectedMap[id] = true;
    }
  };

  const groupState = computed<boolean | "indeterminate">({
    get: () => {
      const count = selectedIds.value.length;
      const total = items.value.length;
      if (total === 0 || count === 0) return false;
      if (count === total) return true;
      return "indeterminate";
    },
    set: (state) => {
      if (state === true) {
        items.value.forEach((item) => {
          selectedMap[item.id] = true;
        });
      } else {
        for (const key in selectedMap) {
          delete selectedMap[key];
        }
      }
    },
  });

  return {
    isSelected,
    toggle: toggleItem,
    groupState,
  };
};
