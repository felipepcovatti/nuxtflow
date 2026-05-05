import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import DefaultLayout from "./default.vue";

async function mountLayout() {
  return mountSuspended(DefaultLayout, {
    shallow: true,
    slots: {
      default: '<div data-test="page-content">Page content</div>',
    },
  });
}

describe("layouts/default", () => {
  it("renders the layout structure and slot content", async () => {
    const wrapper = await mountLayout();

    expect(wrapper.findComponent({ name: "LayoutHeader" }).exists()).toBe(true);
    expect(
      wrapper.findComponent({ name: "LayoutNavigationSidebar" }).exists(),
    ).toBe(true);
    expect(wrapper.findComponent({ name: "LayoutFooter" }).exists()).toBe(true);
    expect(
      wrapper.findComponent({ name: "LayoutNavigationDrawer" }).exists(),
    ).toBe(true);
    expect(wrapper.get("main").text()).toContain("Page content");
  });

  it("starts with the sidebar pinned and the drawer closed", async () => {
    const wrapper = await mountLayout();

    expect(
      wrapper.findComponent({ name: "LayoutNavigationSidebar" }).props("pinned"),
    ).toBe(true);
    expect(
      wrapper.findComponent({ name: "LayoutNavigationDrawer" }).props("open"),
    ).toBe(false);
  });

  it("toggles the sidebar pinned state when requested by the header", async () => {
    const wrapper = await mountLayout();
    const header = wrapper.getComponent({ name: "LayoutHeader" });

    await header.vm.$emit("toggleNavigationSidebarPin");

    expect(
      wrapper.findComponent({ name: "LayoutNavigationSidebar" }).props("pinned"),
    ).toBe(false);
  });

  it("opens the navigation drawer when requested by the header", async () => {
    const wrapper = await mountLayout();
    const header = wrapper.getComponent({ name: "LayoutHeader" });

    await header.vm.$emit("openNavigationDrawer");

    expect(
      wrapper.findComponent({ name: "LayoutNavigationDrawer" }).props("open"),
    ).toBe(true);
  });
});
