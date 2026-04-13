import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Card from "./Card.vue";

describe("Card", () => {
  describe("rendering", () => {
    it("renders title and icon", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
        },
      });

      expect(wrapper.text()).toContain("Test Title");
      expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
        "test-icon",
      );
    });

    it("renders total with money formatting", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
          data: {
            last_30_days: 123456,
            previous_90_days_average: 100000,
          },
          money: true,
        },
      });

      expect(wrapper.text()).toContain("$123.5K");
    });

    it("renders total with number formatting", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
          data: {
            last_30_days: 1234,
            previous_90_days_average: 1000,
          },
        },
      });

      expect(wrapper.text()).toContain("1,234");
    });

    it("renders growth percentage when data is available", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
          data: {
            last_30_days: 120,
            previous_90_days_average: 100,
          },
        },
      });

      expect(wrapper.text()).toContain("vs last 3 months");
      expect(wrapper.findComponent({ name: "GrowthPercentage" }).exists()).toBe(
        true,
      );
    });

    it("does not render growth when data is missing", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
        },
      });

      expect(wrapper.text()).not.toContain("vs last 3 months");
    });

    it("applies loading attribute", async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          icon: "test-icon",
          title: "Test Title",
          loading: true,
        },
      });

      expect(wrapper.attributes("data-loading")).toBe("true");
    });
  });
});
