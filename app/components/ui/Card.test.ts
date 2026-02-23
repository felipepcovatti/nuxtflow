import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card", () => {
  it("renders title and subtitle when provided", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Revenue",
        subtitle: "January 2026",
      },
    });

    expect(wrapper.find(".heading-2").text()).toBe("Revenue");
    expect(wrapper.text()).toContain("January 2026");
    expect(wrapper.find("header").exists()).toBe(true);
  });

  it("does not render the header if title and subtitle are missing", () => {
    const wrapper = mount(Card, {
      props: {},
    });

    expect(wrapper.find("header").exists()).toBe(false);
  });

  it("renders default slot content regardless of header", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "<div data-test='content'>Main Content</div>",
      },
    });

    expect(wrapper.get('[data-test="content"]').text()).toBe("Main Content");
  });

  it("renders header-end slot content within the header", () => {
    const wrapper = mount(Card, {
      props: { title: "Visible Header" },
      slots: {
        "header-end": "<button data-test='header-btn'>Action</button>",
      },
    });

    expect(wrapper.find("header").exists()).toBe(true);
    expect(wrapper.get('[data-test="header-btn"]').text()).toBe("Action");
  });
});
