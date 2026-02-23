import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import Drawer from "./Drawer.vue";

const { expandActiveItem } = vi.hoisted(() => ({
  expandActiveItem: vi.fn(),
}));

const mRoute = reactive({ path: "/home" });

mockNuxtImport("useRoute", () => {
  return () => mRoute;
});

const isExtraSmall = ref(true);
mockNuxtImport("useIsExtraSmall", () => {
  return () => ({
    isExtraSmall,
  });
});

vi.mock("~/components/layout/navigation/Items.vue", () => ({
  default: {
    name: "LayoutNavigationItems",
    template: "<div />",
    methods: {
      expandActiveItem,
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
    expandActiveItem.mockClear();
    mRoute.path = "/home";
    isExtraSmall.value = true;
  });

  it("expands active item when opened", async () => {
    const wrapper = await mountDrawer({ open: false });
    await wrapper.setProps({ open: true });

    await nextTick();

    expect(expandActiveItem).toHaveBeenCalledTimes(1);
  });

  it("closes when route changes", async () => {
    const wrapper = await mountDrawer({ open: true });

    mRoute.path = "/admin";

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });

  it("closes when breakpoint becomes ≥ sm", async () => {
    const wrapper = await mountDrawer({ open: true });

    isExtraSmall.value = false;

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });

  it("closes when navigation item emits select", async () => {
    const wrapper = await mountDrawer({ open: true });

    const nav = wrapper.getComponent({ name: "LayoutNavigationItems" });

    nav.vm.$emit("select");

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });
});
