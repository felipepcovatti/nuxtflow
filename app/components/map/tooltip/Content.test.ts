import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Content from "./Content.vue";

describe("Content", () => {
  describe("rendering", () => {
    it("renders title, label, and value correctly", async () => {
      const wrapper = await mountSuspended(Content, {
        props: {
          title: "Sample Title",
          label: "Visits",
          value: 1234,
        },
      });

      expect(wrapper.text()).toContain("Sample Title");
      expect(wrapper.text()).toContain("Visits:");
      expect(wrapper.text()).toContain("1234");
    });
  });
});
