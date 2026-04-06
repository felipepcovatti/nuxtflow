import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card", () => {
  it("renders title, subtitle and content", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Revenue",
        subtitle: "January 2026",
      },
      slots: {
        default: "<div data-test='content'>Main Content</div>",
      },
    });

    expect(wrapper.find(".section-title").text()).toBe("Revenue");
    expect(wrapper.text()).toContain("January 2026");
    expect(wrapper.find("header").exists()).toBe(true);
    expect(wrapper.get('[data-test="content"]').text()).toBe("Main Content");
  });

  it("renders headerEnd slot content within the header", () => {
    const wrapper = mount(Card, {
      props: { title: "Header", subtitle: "With Action" },
      slots: {
        headerEnd: "<button data-test='header-btn'>Action</button>",
      },
    });

    expect(wrapper.find("header").exists()).toBe(true);
    expect(wrapper.get('[data-test="header-btn"]').text()).toBe("Action");
  });
});
