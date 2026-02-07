import { MENU_ITEMS, type MenuItem } from "~/constants/menu";

export const useMenu = () => {
  const route = useRoute();

  const activeItem = computed(() =>
    MENU_ITEMS.find((item) => getItemState(item) === "active"),
  );

  const expandedItems = ref<string[]>(
    MENU_ITEMS.flatMap((item) => (item.subItems ? [item.path] : [])),
  );

  function getItemState(item: MenuItem): "active" | "inactive" {
    if (item.subItems) {
      return item.subItems.some((item) => route.path.includes(item))
        ? "active"
        : "inactive";
    }
    return route.path.includes(item.path) ? "active" : "inactive";
  }

  function expandActiveItem() {
    if (activeItem.value?.subItems) {
      expandedItems.value = Array.from(
        new Set(expandedItems.value).add(activeItem.value.path),
      );
    }
  }

  function collapseAllItems() {
    expandedItems.value = [];
  }

  return {
    activeItem,
    getItemState,
    expandedItems,
    expandActiveItem,
    collapseAllItems,
  };
};
