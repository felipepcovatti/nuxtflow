import { NAVIGATION_ITEMS, type NavigationItem } from "~/constants/navigation";

export const useNavigation = () => {
  const route = useRoute();

  const activeItem = computed(() =>
    NAVIGATION_ITEMS.find((item) => getItemState(item) === "active"),
  );

  const expandedItems = ref<string[]>(
    NAVIGATION_ITEMS.flatMap((item) => (item.subItems ? [item.path] : [])),
  );

  function getItemState(item: NavigationItem): "active" | "inactive" {
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
    getItemState,
    expandedItems,
    expandActiveItem,
    collapseAllItems,
  };
};
