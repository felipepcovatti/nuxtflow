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
    });

    const text = wrapper.text();

    expect(text).toContain("Revenue");
    expect(text).toContain("100");
    expect(text).toContain("Cost");
    expect(text).toContain("50");
  });

  it("renders each item label and value", () => {
    const wrapper = mount(Content, {
      props: {
        title: "January",
        items,
      },
    });

    items.forEach(({ label, value }) => {
      expect(wrapper.text()).toContain(label);
      expect(wrapper.text()).toContain(String(value));
    });
  });

  it("renders all item labels and values in order", () => {
    const wrapper = mount(Content, {
      props: {
        title: "January",
        items,
      },
    });

    const text = wrapper.text();

    expect(text.indexOf("Revenue")).toBeLessThan(text.indexOf("Cost"));
    expect(text.indexOf("100")).toBeLessThan(text.indexOf("50"));
  });
});
