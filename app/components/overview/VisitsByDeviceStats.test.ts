import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import VisitsByDeviceStats from "./VisitsByDeviceStats.vue";

describe("VisitsByDeviceStats", () => {
  it("renders device percentages and formatted numbers when stats provided", async () => {
    const wrapper = await mountSuspended(VisitsByDeviceStats, {
      props: {
        stats: {
          desktop: 1200,
          mobile: 600,
          tablet: 200,
        },
        totalVisits: 2000,
      },
    });

    expect(wrapper.text()).toContain("60.0%");
    expect(wrapper.text()).toContain("30.0%");
    expect(wrapper.text()).toContain("10.0%");

    expect(wrapper.text()).toContain("1.2K");
    expect(wrapper.text()).toContain("600");
    expect(wrapper.text()).toContain("200");
  });

  it("renders nothing for numbers when stats is undefined", async () => {
    const wrapper = await mountSuspended(VisitsByDeviceStats, {
      props: {
        stats: undefined,
        totalVisits: 0,
      },
    });
    console.log(wrapper.text());
    expect(wrapper.text()).not.toContain("%");
  });
});
