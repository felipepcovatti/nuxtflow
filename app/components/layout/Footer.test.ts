import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Footer from "./Footer.vue";
import { FOOTER_NAVIGATION_ITEMS } from "~/constants/navigation";

describe("Footer", () => {
  describe("rendering", () => {
    it("renders all footer navigation items", async () => {
      const wrapper = await mountSuspended(Footer);

      const links = wrapper.findAll("a");

      expect(links).toHaveLength(FOOTER_NAVIGATION_ITEMS.length);

      const expectedHrefs = FOOTER_NAVIGATION_ITEMS.map((item) => `/${item}`);

      links.forEach((link, index) => {
        expect(link.attributes("href")).toBe(expectedHrefs[index]);
      });
    });

    it("renders footer with correct structure", async () => {
      const wrapper = await mountSuspended(Footer);

      expect(wrapper.find("footer").exists()).toBe(true);
      expect(wrapper.find("nav").exists()).toBe(true);
      expect(wrapper.find("ul").exists()).toBe(true);
      expect(wrapper.findAll("li")).toHaveLength(
        FOOTER_NAVIGATION_ITEMS.length,
      );
    });
  });
});
