import { describe, expect, it, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Items from "./Items.vue";

vi.mock("~/constants/navigation", () => ({
  NAVIGATION_ITEMS: [
    {
      path: "overview",
      icon: "test:overview",
    },
    {
      path: "pages",
      icon: "test:pages",
      subItems: ["kanban"],
    },
  ],
}));

describe("Items", () => {
  it("renders one entry per navigation item", async () => {
    const wrapper = await mountSuspended(Items);

    const groups = wrapper.findAll(".group\\/item");
    expect(groups).toHaveLength(2);
  });

  it("emits 'select' when a navigation link is clicked", async () => {
    const wrapper = await mountSuspended(Items);

    const link = wrapper.get('a[href="/overview"]');

    await link.trigger("click");

    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("activates and expands the correct parent when visiting a sub-route", async () => {
    const subPath = "/pages/kanban";
    const wrapper = await mountSuspended(Items, { route: subPath });

    const activeGroup = wrapper.get(`.group\\/item:has(a[href="${subPath}"])`);

    expect(activeGroup.attributes("data-state")).toBe("active");

    const trigger = activeGroup.get("button[data-state]");

    expect(trigger.attributes("data-state")).toBe("open");
  });
});
