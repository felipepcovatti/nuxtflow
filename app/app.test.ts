import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "./app.vue";
import DefaultLayout from "./layouts/default.vue";

describe("app", () => {
  it("renders the main layout components", async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      shallow: true,
      slots: { default: '<div data-test="page-content">Page content</div>' },
    });

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
});
