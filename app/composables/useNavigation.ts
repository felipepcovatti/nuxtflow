import { NAVIGATION_ITEMS } from "~/constants/navigation";
import type { NavigationItem } from "~/types/navigation";

export const useNavigation = () => {
  const route = useRoute();

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
    const activeItem = NAVIGATION_ITEMS.find(
      (item) => getItemState(item) === "active",
    );
    if (activeItem?.subItems) {
      expandedItems.value = Array.from(
        new Set(expandedItems.value).add(activeItem.path),
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
