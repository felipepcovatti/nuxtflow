import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import Drawer from "./Drawer.vue";

const { expandActiveItem } = vi.hoisted(() => ({
  expandActiveItem: vi.fn(),
}));

const mRoute = reactive({ path: "/home" });

mockNuxtImport("useRoute", () => {
  return () => mRoute;
});

const isBreakpointSm = ref(false);

vi.mock("@vueuse/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@vueuse/core")>();

  return {
    ...actual,
    useBreakpoints: () => ({
      greaterOrEqual: () => computed(() => isBreakpointSm.value),
    }),
  };
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

/* -------------------------------------------------- */

describe("Navigation Drawer", () => {
  beforeEach(() => {
    expandActiveItem.mockClear();
    mRoute.path = "/home";
    isBreakpointSm.value = false;
  });

  it("expands active item when opened", async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { open: false },
    });

    await wrapper.setProps({ open: true });

    await nextTick();

    expect(expandActiveItem).toHaveBeenCalledTimes(1);
  });

  it("closes when route changes", async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { open: true },
    });

    mRoute.path = "/admin";

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });

  it("closes when breakpoint becomes ≥ sm", async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { open: true },
    });

    isBreakpointSm.value = true;

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });

  it("closes when navigation item emits select", async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: { open: true },
    });

    const nav = wrapper.findComponent({ name: "LayoutNavigationItems" });

    nav.vm.$emit("select");

    await nextTick();

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
  });
});
