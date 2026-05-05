import { nextTick } from "vue";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Drawer from "./Drawer.vue";

const { mockedExpandActiveItem, mockedDrawerState } = vi.hoisted(() => ({
  mockedExpandActiveItem: vi.fn(),
  mockedDrawerState: {
    route: null as { path: string } | null,
    isExtraSmall: null as { value: boolean } | null,
  },
}));

mockNuxtImport("useRoute", async () => {
  const { reactive } = await import("vue");

  return () => {
    mockedDrawerState.route ??= reactive({ path: "/home" });

    return mockedDrawerState.route;
  };
});

mockNuxtImport("useIsExtraSmall", async () => {
  const { ref } = await import("vue");

  return () => {
    mockedDrawerState.isExtraSmall ??= ref(true);

    return {
      isExtraSmall: mockedDrawerState.isExtraSmall,
    };
  };
});

vi.mock("~/components/layout/navigation/Items.vue", () => ({
  default: {
    name: "LayoutNavigationItems",
    template: "<div />",
    methods: {
      expandActiveItem: mockedExpandActiveItem,
    },
  },
}));

async function mountDrawer(props: { open: boolean }) {
  return mountSuspended(Drawer, {
    props,
    attachTo: document.body,
  });
}

describe("Drawer", () => {
  beforeEach(() => {
    mockedExpandActiveItem.mockReset();

    if (mockedDrawerState.route) {
      mockedDrawerState.route.path = "/home";
    }

    if (mockedDrawerState.isExtraSmall) {
      mockedDrawerState.isExtraSmall.value = true;
    }
  });

  it("expands the active item when opened", async () => {
    const wrapper = await mountDrawer({ open: false });

    await wrapper.setProps({ open: true });
    await nextTick();

    expect(mockedExpandActiveItem).toHaveBeenCalledTimes(1);
  });

  it("closes when the route changes", async () => {
    const wrapper = await mountDrawer({ open: true });

    if (!mockedDrawerState.route) {
      throw new Error("Expected mocked route to be initialized");
    }

    mockedDrawerState.route.path = "/admin";
    await nextTick();

    expect(wrapper.emitted("update:open")?.at(0)).toEqual([false]);
  });

  it("closes when the viewport reaches the small breakpoint", async () => {
    const wrapper = await mountDrawer({ open: true });

    if (!mockedDrawerState.isExtraSmall) {
      throw new Error("Expected mocked breakpoint state to be initialized");
    }

    mockedDrawerState.isExtraSmall.value = false;
    await nextTick();

    expect(wrapper.emitted("update:open")?.at(0)).toEqual([false]);
  });

  it("closes when a navigation item is selected", async () => {
    const wrapper = await mountDrawer({ open: true });
    const navigationItems = wrapper.getComponent({
      name: "LayoutNavigationItems",
    });

    await navigationItems.vm.$emit("select");

    expect(wrapper.emitted("update:open")?.at(0)).toEqual([false]);
  });
});
