import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Content from "./Content.vue";

describe("Content", () => {
  const items = [
    { label: "Revenue", color: "blue", value: 100 },
    { label: "Cost", color: "orange", value: 50 },
  ];

  it("renders the title", () => {
    const wrapper = mount(Content, {
      props: {
        title: "January",
        items,
      },
    });

    expect(wrapper.text()).toContain("January");
  });

  it("renders the correct number of legend items", () => {
    const wrapper = mount(Content, {
      props: {
        title: "January",
        items,
      },
      global: {
        stubs: {
          ChartLegendItem: true,
        },
      },
    });

    const legendItems = wrapper.findAllComponents({ name: "ChartLegendItem" });
    expect(legendItems).toHaveLength(2);
  });

  it("forwards props to ChartLegendItem", () => {
    const wrapper = mount(Content, {
      props: {
        title: "January",
        items,
      },
      global: {
        stubs: {
          ChartLegendItem: true,
        },
      },
    });

    const legendItems = wrapper.findAllComponents({ name: "ChartLegendItem" });

    expect(legendItems[0]?.props()).toEqual(items[0]);
    expect(legendItems[1]?.props()).toEqual(items[1]);
  });
});
