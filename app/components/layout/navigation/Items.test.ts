import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { NAVIGATION_ITEMS } from "~/constants/navigation";
import Items from "./Items.vue";

describe("Items.vue", () => {
  describe("rendering", () => {
    it("renders one entry per navigation item", async () => {
      const wrapper = await mountSuspended(Items);

      const groups = wrapper.findAll(".group\\/item");
      expect(groups).toHaveLength(NAVIGATION_ITEMS.length);
    });

    it("renders translated labels (not raw i18n keys)", async () => {
      const wrapper = await mountSuspended(Items);

      const html = wrapper.html();
      expect(html).not.toMatch(/itemPath\.|subitemPath\./);
    });
  });

  describe("interaction", () => {
    it("emits 'select' when a navigation link is clicked", async () => {
      const wrapper = await mountSuspended(Items);

      const link = wrapper.find("a");

      if (!link.exists()) {
        throw new Error("Expected at least one navigation link to exist");
      }

      await link.trigger("click");

      expect(wrapper.emitted("select")).toHaveLength(1);
    });
  });

  describe("route-driven state", () => {
    it("activates and expands the correct parent when visiting a sub-route", async () => {
      const parent = NAVIGATION_ITEMS.find((i) => i.subItems?.length);

      if (!parent) {
        throw new Error(
          "Expected NAVIGATION_ITEMS to contain at least one item with subItems",
        );
      }

      const subItem = parent.subItems?.[0];

      if (!subItem) {
        throw new Error(
          `Expected item "${parent.path}" to contain at least one subItem`,
        );
      }

      const subPath = `/${parent.path}/${subItem}`;
      const wrapper = await mountSuspended(Items, { route: subPath });

      const activeGroup = wrapper.find(
        `.group\\/item:has(a[href="${subPath}"])`,
      );

      if (!activeGroup.exists()) {
        throw new Error(`Expected group containing ${subPath} to exist`);
      }

      expect(activeGroup.attributes("data-state")).toBe("active");

      const trigger = activeGroup.find("button[data-state]");

      if (!trigger.exists()) {
        throw new Error("Expected accordion trigger button to exist");
      }

      expect(trigger.attributes("data-state")).toBe("open");
    });
  });
});
