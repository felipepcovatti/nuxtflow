import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import GrowthPercentage from "./GrowthPercentage.vue";

describe("GrowthPercentage", () => {
  it("renders an increase with the up icon and positive color", async () => {
    const wrapper = await mountSuspended(GrowthPercentage, {
      props: {
        percentage: 12.34,
      },
    });
    expect(wrapper.text()).toContain("12.3%");
    expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
      "flowbite:arrow-up-outline",
    );
    expect(wrapper.attributes("style")).toContain("var(--color-green-500)");
  });

  it("renders a decrease with the down icon and negative color", async () => {
    const wrapper = await mountSuspended(GrowthPercentage, {
      props: {
        percentage: -7.89,
      },
    });

    expect(wrapper.text()).toContain("7.9%");
    expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
      "flowbite:arrow-down-outline",
    );
    expect(wrapper.attributes("style")).toContain("var(--color-red-500)");
  });

  it("renders a constant value without an arrow icon", async () => {
    const wrapper = await mountSuspended(GrowthPercentage, {
      props: {
        percentage: 0,
      },
    });

    expect(wrapper.text()).toContain("0.0%");
    expect(wrapper.findComponent({ name: "NuxtIcon" }).exists()).toBe(false);
    expect(wrapper.attributes("style")).toContain("var(--color-gray-400)");
  });

  it("inverts the sentiment color when requested", async () => {
    const wrapper = await mountSuspended(GrowthPercentage, {
      props: {
        percentage: 5,
        inverted: true,
      },
    });

    expect(wrapper.text()).toContain("5.0%");
    expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
      "flowbite:arrow-up-outline",
    );
    expect(wrapper.attributes("style")).toContain("var(--color-red-500)");
  });
});
