import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Header from "./Header.vue";

describe("Header", () => {
  describe("rendering", () => {
    it("renders the search input with translated placeholder", async () => {
      const wrapper = await mountSuspended(Header);

      const input = wrapper.get('input[name="search_field"]');

      expect(input.attributes("placeholder")).toBe("Search");
    });

    it("contains a logo linking to home", async () => {
      const wrapper = await mountSuspended(Header);

      const homeLink = wrapper.find('a[href="/"]');

      expect(homeLink.exists()).toBe(true);

      expect(homeLink.find('img[alt="Logo image"]').exists()).toBe(true);
    });
  });

  describe("interaction", () => {
    it("emits 'toggleNavigationSidebarPin' when desktop menu button is clicked", async () => {
      const wrapper = await mountSuspended(Header);

      const button = wrapper.get('button[aria-controls="navigation-sidebar"]');

      await button.trigger("click");

      expect(wrapper.emitted("toggleNavigationSidebarPin")).toHaveLength(1);
    });

    it("emits 'openNavigationDrawer' when mobile menu button is clicked", async () => {
      const wrapper = await mountSuspended(Header);

      const button = wrapper.get('button[aria-controls="navigation-drawer"]');

      await button.trigger("click");

      expect(wrapper.emitted("openNavigationDrawer")).toHaveLength(1);
    });

    it("updates the input value when typing", async () => {
      const wrapper = await mountSuspended(Header);

      const input = wrapper.get('input[name="search_field"]');

      await input.setValue("Nuxt");

      expect((input.element as HTMLInputElement).value).toBe("Nuxt");
    });
  });
});
