import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Sidebar from "./Sidebar.vue";

// ✅ Create spies in a hoisted block
const { expandActiveItem, collapseAllItems } = vi.hoisted(() => ({
  expandActiveItem: vi.fn(),
  collapseAllItems: vi.fn(),
}));

// ✅ Now mock the component
vi.mock("~/components/layout/navigation/Items.vue", () => ({
  default: {
    name: "LayoutNavigationItems",
    template: "<div />",
    methods: {
      expandActiveItem,
      collapseAllItems,
    },
  },
}));

describe("Sidebar navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    expandActiveItem.mockClear();
    collapseAllItems.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("expands on mouseenter when not pinned (with delay)", async () => {
    const wrapper = await mountSuspended(Sidebar, {
      props: { pinned: false },
    });

    await wrapper.trigger("mouseenter");

    vi.advanceTimersByTime(200);

    expect(expandActiveItem).toHaveBeenCalledTimes(1);
  });

  it("collapses on mouseleave when not pinned", async () => {
    const wrapper = await mountSuspended(Sidebar, {
      props: { pinned: false },
    });

    // First expand
    await wrapper.trigger("mouseenter");

    expect(wrapper.attributes("data-expanded")).toBe("true");

    // Then collapse
    await wrapper.trigger("mouseleave");

    expect(collapseAllItems).toHaveBeenCalledTimes(1);
    expect(wrapper.attributes("data-expanded")).toBe("false");
  });

  it("immediately expands active item when pinned after being collapsed", async () => {
    const wrapper = await mountSuspended(Sidebar, {
      props: { pinned: false },
    });

    await wrapper.trigger("mouseleave");
    expect(wrapper.attributes("data-expanded")).toBe("false");

    await wrapper.setProps({ pinned: true });

    vi.runAllTimers();

    expect(expandActiveItem).toHaveBeenCalledTimes(1);
    expect(wrapper.attributes("data-expanded")).toBe("true");
  });

  it("keeps expanded when pinned and ignores mouseleave", async () => {
    const wrapper = await mountSuspended(Sidebar, {
      props: { pinned: true },
    });

    await wrapper.trigger("mouseleave");

    expect(wrapper.attributes("data-expanded")).toBe("true");
    expect(collapseAllItems).not.toHaveBeenCalled();
  });
});
