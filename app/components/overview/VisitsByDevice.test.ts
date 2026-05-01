import { describe, expect, it } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import VisitsByDevice from "./VisitsByDevice.vue";

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref({
      data: {
        visits: {
          desktop: 1200,
          mobile: 600,
          tablet: 200,
        },
        total_visits: 2000,
        total_visits_growth_percentage: 12.5,
      },
    }),
    pending: ref(false),
  });
});

function mountVisitsByDevice() {
  return mountSuspended(VisitsByDevice, {
    global: {
      stubs: {
        UiChart: {
          name: "UiChart",
          template: "<div />",
          props: ["type", "dataRecords", "items"],
        },
      },
    },
  });
}

describe("VisitsByDevice", () => {
  it("renders formatted summary, subtitle, link and period select", async () => {
    const wrapper = await mountVisitsByDevice();

    expect(wrapper.text()).toContain("2K");
    expect(wrapper.text()).toContain("Visits by device");

    const card = wrapper.getComponent({ name: "UiCard" });
    expect(card.props("link")).toEqual({
      label: "View user report",
      to: "user-report",
    });

    const growth = wrapper.getComponent({ name: "GrowthPercentage" });
    expect(growth.props("percentage")).toBe(12.5);

    const periodSelect = wrapper.getComponent({ name: "PeriodSelect" });
    expect(periodSelect.props("modelValue")).toBe("7D");
  });

  it("passes visits data to chart and stats child", async () => {
    const wrapper = await mountVisitsByDevice();

    const chart = wrapper.getComponent({ name: "UiChart" });
    expect(chart.props("dataRecords")).toEqual([
      { desktop: 1200, mobile: 600, tablet: 200 },
    ]);

    const stats = wrapper.getComponent({ name: "OverviewVisitsByDeviceStats" });
    expect(stats.props("stats")).toEqual({
      desktop: 1200,
      mobile: 600,
      tablet: 200,
    });
    expect(stats.props("totalVisits")).toBe(2000);
  });
});
