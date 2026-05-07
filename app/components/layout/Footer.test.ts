import { describe, expect, it, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Footer from "./Footer.vue";

const { mockedFooterNavigationItems } = vi.hoisted(() => ({
  mockedFooterNavigationItems: ["company", "support", "legal"],
}));

vi.mock("~/constants/navigation", () => ({
  FOOTER_NAVIGATION_ITEMS: mockedFooterNavigationItems,
}));

describe("Footer", () => {
  it("renders all footer navigation items", async () => {
    const wrapper = await mountSuspended(Footer);

    const links = wrapper.findAll("a");

    expect(links).toHaveLength(mockedFooterNavigationItems.length);

    const expectedHrefs = mockedFooterNavigationItems.map((item) => `/${item}`);

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
      mockedFooterNavigationItems.length,
    );
  });
});
