import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Content from "./Content.vue";

describe("Content", () => {
  describe("rendering", () => {
    it("renders country name, visits label, and visits correctly", async () => {
      const wrapper = await mountSuspended(Content, {
        props: {
          country: "Brazil",
          visitsLabel: "Visits",
          visits: "1234",
        },
      });

      expect(wrapper.text()).toContain("Brazil");
      expect(wrapper.text()).toContain("Visits:");
      expect(wrapper.text()).toContain("1234");
    });
  });
});
