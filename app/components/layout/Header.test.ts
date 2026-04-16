import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Header from "./Header.vue";

describe("Header", () => {
  it("renders the searchbox and action buttons", async () => {
    const wrapper = await mountSuspended(Header);

    const input = wrapper.findComponent({ name: "UiSearchBox" });
    expect(input.exists()).toBe(true);

    const notificationButton = wrapper.find(
      'button[aria-label="Notifications"]',
    );
    expect(notificationButton.exists()).toBe(true);

    const appsButton = wrapper.find('button[aria-label="Apps"]');
    expect(appsButton.exists()).toBe(true);

    const accountButton = wrapper.find('button[aria-label="Account"]');
    expect(accountButton.exists()).toBe(true);
  });

  it("contains a logo linking to home", async () => {
    const wrapper = await mountSuspended(Header);

    const homeLink = wrapper.find('a[href="/"]');

    expect(homeLink.exists()).toBe(true);
    expect(homeLink.find("img").attributes("alt")).toBe("Nuxt Logo");
  });

  it("emits 'toggleNavigationSidebarPin' when desktop menu button is clicked", async () => {
    const wrapper = await mountSuspended(Header);

    const button = wrapper.find('button[aria-controls="navigation-sidebar"]');

    await button.trigger("click");

    expect(wrapper.emitted("toggleNavigationSidebarPin")).toHaveLength(1);
  });

  it("emits 'openNavigationDrawer' when mobile menu button is clicked", async () => {
    const wrapper = await mountSuspended(Header);

    const button = wrapper.find('button[aria-controls="navigation-drawer"]');

    await button.trigger("click");

    expect(wrapper.emitted("openNavigationDrawer")).toHaveLength(1);
  });
});
