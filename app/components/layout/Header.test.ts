import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Header from "./Header.vue";

describe("Header.vue", () => {
  describe("rendering", () => {
    it("renders the search input with translated placeholder", async () => {
      const wrapper = await mountSuspended(Header);

      const input = wrapper.find('input[name="search_field"]');
      if (!input.exists()) {
        throw new Error("Expected search input to exist");
      }

      expect(input.attributes("placeholder")).toBe("Search");
    });

    it("contains a logo linking to home", async () => {
      const wrapper = await mountSuspended(Header);

      const logoLink = wrapper.findComponent({ name: "NuxtLink" });
      if (!logoLink.exists()) {
        throw new Error("Expected NuxtLink logo to exist");
      }

      expect(logoLink.props("to")).toBe("/");

      const logoImg = wrapper.find('img[alt="Logo image"]');
      expect(logoImg.exists()).toBe(true);
    });
  });

  describe("interaction", () => {
    it("emits 'toggleNavigationSidebarPin' when desktop menu button is clicked", async () => {
      const wrapper = await mountSuspended(Header);

      const button = wrapper.find('button[aria-controls="navigation-sidebar"]');

      if (!button.exists()) {
        throw new Error(
          "Expected desktop menu button (navigation-sidebar) to exist",
        );
      }

      await button.trigger("click");

      expect(wrapper.emitted("toggleNavigationSidebarPin")).toHaveLength(1);
    });

    it("emits 'openNavigationDrawer' when mobile menu button is clicked", async () => {
      const wrapper = await mountSuspended(Header);

      const button = wrapper.find('button[aria-controls="navigation-drawer"]');

      if (!button.exists()) {
        throw new Error(
          "Expected mobile menu button (navigation-drawer) to exist",
        );
      }

      await button.trigger("click");

      expect(wrapper.emitted("openNavigationDrawer")).toHaveLength(1);
    });

    it("updates the input value when typing", async () => {
      const wrapper = await mountSuspended(Header);

      const input = wrapper.find('input[name="search_field"]');
      if (!input.exists()) {
        throw new Error("Expected search input to exist");
      }

      await input.setValue("Nuxt");

      expect((input.element as HTMLInputElement).value).toBe("Nuxt");
    });
  });
});
