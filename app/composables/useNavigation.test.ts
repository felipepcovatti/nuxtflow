import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useNavigation } from "./useNavigation";
import type { NavigationItem } from "~/constants/navigation";

const { mockedRoute } = vi.hoisted(() => ({
  mockedRoute: { path: "/home" },
}));

mockNuxtImport("useRoute", () => {
  return () => mockedRoute;
});

vi.mock("~/constants/navigation", () => ({
  NAVIGATION_ITEMS: [
    { path: "home", icon: "home-icon" },
    {
      path: "admin",
      subItems: ["users", "settings"],
      icon: "admin-icon",
    },
  ],
}));

describe("useNavigation", () => {
  beforeEach(() => {
    mockedRoute.path = "/home";
  });

  it("initializes all items, with group items expanded by default", () => {
    const { expandedItems } = useNavigation();

    expect(expandedItems.value).toEqual(["admin"]);
  });

  it("determines item state (active/inactive) correctly for items group-items", () => {
    const { getItemState } = useNavigation();

    const homeItem: NavigationItem = { path: "home", icon: "home-icon" };
    const adminItem: NavigationItem = {
      path: "admin",
      icon: "admin-icon",
      subItems: ["users", "settings"],
    };

    expect(getItemState(homeItem)).toBe("active");
    expect(getItemState(adminItem)).toBe("inactive");

    mockedRoute.path = "/admin/users";

    expect(getItemState(homeItem)).toBe("inactive");
    expect(getItemState(adminItem)).toBe("active");
  });

  it("collapses all expanded group-items when collapseAllItems is called", () => {
    const { expandedItems, collapseAllItems } = useNavigation();

    expect(expandedItems.value).toEqual(["admin"]);

    collapseAllItems();

    expect(expandedItems.value).toEqual([]);
  });

  it("expands active item if it is a group-item, when expandActiveItem is called", async () => {
    const { expandedItems, collapseAllItems, expandActiveItem, getItemState } =
      useNavigation();

    collapseAllItems();

    expandActiveItem();

    expect(expandedItems.value).toEqual([]);

    mockedRoute.path = "/admin/users";

    collapseAllItems();

    expect(expandedItems.value).toEqual([]);

    expandActiveItem();

    expect(expandedItems.value).toContain("admin");
  });
});
