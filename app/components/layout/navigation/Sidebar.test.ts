import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Sidebar from "./Sidebar.vue";

const { expandActiveItem, collapseAllItems } = vi.hoisted(() => ({
  expandActiveItem: vi.fn(),
  collapseAllItems: vi.fn(),
}));

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

describe("Sidebar", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    expandActiveItem.mockClear();
    collapseAllItems.mockClear();
  });

  afterAll(() => {
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

    await wrapper.trigger("mouseenter");

    expect(wrapper.attributes("data-expanded")).toBe("true");

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

    vi.advanceTimersToNextFrame();

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
