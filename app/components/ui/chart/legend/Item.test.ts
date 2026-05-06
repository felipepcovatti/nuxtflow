import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Item from "./Item.vue";

describe("Item", () => {
  it("renders with a label and value", async () => {
    const wrapper = await mountSuspended(Item, {
      props: {
        label: "Item A",
        color: "blue",
        value: "100",
      },
    });

    expect(wrapper.text()).toContain("Item A:");
    expect(wrapper.text()).toContain("100");
  });

  it("renders with label only", async () => {
    const wrapper = await mountSuspended(Item, {
      props: {
        label: "Total",
        color: "green",
      },
    });

    expect(wrapper.text()).toBe("Total");
    expect(wrapper.text()).not.toContain(":");
  });

  it("applies the correct background color to the bullet", async () => {
    const wrapper = await mountSuspended(Item, {
      props: { label: "Test", color: "orange" },
    });

    const bullet = wrapper.get(".rounded-full").element as HTMLElement;

    expect(bullet.style.backgroundColor).toBe("orange");
  });
});
