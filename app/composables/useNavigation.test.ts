import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useNavigation } from "./useNavigation";
import type { NavigationItem } from "~/constants/navigation";

const { mRoute } = vi.hoisted(() => ({
  mRoute: { path: "/home" },
}));

mockNuxtImport("useRoute", () => {
  return () => mRoute;
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
    mRoute.path = "/home";
  });

  describe("initial state", () => {
    it("initializes expandedItems with all items that have subItems", () => {
      const { expandedItems } = useNavigation();

      expect(expandedItems.value).toEqual(["admin"]);
    });
  });

  describe("getItemState", () => {
    it("returns 'active' when top-level route matches exactly", () => {
      const { getItemState } = useNavigation();

      const item: NavigationItem = {
        path: "home",
        icon: "home-icon",
      };

      expect(getItemState(item)).toBe("active");
    });

    it("returns 'active' when route matches a subItem", () => {
      mRoute.path = "/admin/users";

      const { getItemState } = useNavigation();

      const parent: NavigationItem = {
        path: "admin",
        icon: "admin-icon",
        subItems: ["users", "settings"],
      };

      expect(getItemState(parent)).toBe("active");
    });

    it("returns 'inactive' when route does not match item", () => {
      mRoute.path = "/home";

      const { getItemState } = useNavigation();

      const parent: NavigationItem = {
        path: "admin",
        icon: "admin-icon",
        subItems: ["users", "settings"],
      };

      expect(getItemState(parent)).toBe("inactive");
    });
  });

  describe("collapseAllItems", () => {
    it("clears all expanded items", () => {
      const { expandedItems, collapseAllItems } = useNavigation();

      expect(expandedItems.value.length).toBeGreaterThan(0);

      collapseAllItems();

      expect(expandedItems.value).toEqual([]);
    });
  });

  describe("expandActiveItem", () => {
    it("adds the active parent path to expandedItems if it has subItems", () => {
      mRoute.path = "/admin/settings";

      const { expandedItems, collapseAllItems, expandActiveItem } =
        useNavigation();

      collapseAllItems();
      expect(expandedItems.value).toEqual([]);

      expandActiveItem();

      expect(expandedItems.value).toContain("admin");
    });

    it("does nothing if active item has no subItems", () => {
      mRoute.path = "/home";

      const { expandedItems, collapseAllItems, expandActiveItem } =
        useNavigation();

      collapseAllItems();
      expandActiveItem();

      expect(expandedItems.value).toEqual([]);
    });
  });
});
