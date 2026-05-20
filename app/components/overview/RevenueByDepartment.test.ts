import { describe, it, expect, vi, afterEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import RevenueByDepartment from "./RevenueByDepartment.vue";
import type { RevenuesByDepartmentResponse } from "~/types/revenue";

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref<Partial<RevenuesByDepartmentResponse>>({
      data: {
        revenues: [
          {
            date: "2026-04-01:T00:00:00.000Z",
            revenues: {
              electronics: 5000,
              home_living: 7000,
              clothing_accessories: 2000,
            },
          },
          {
            date: "2026-04-02:T00:00:00.000Z",
            revenues: {
              electronics: 6000,
              home_living: 8000,
              clothing_accessories: 3000,
            },
          },
        ],
        total_revenue: 27000,
      },
    }),
    pending: ref(false),
  });
});

function mountRevenueByDepartment() {
  return mountSuspended(RevenueByDepartment, {
    global: {
      stubs: {
        UiChart: {
          name: "UiChart",
          template: "<div />",
          props: ["type", "groupRecords", "groupXGetter", "items"],
        },
      },
    },
  });
}

describe("RevenueByDepartment", () => {
  it("renders the formatted card summary", async () => {
    const wrapper = await mountRevenueByDepartment();

    expect(wrapper.text()).toContain("$27,000");
    expect(wrapper.text()).toContain("Revenue by department");
  });

  it("renders the chart with the correct chart type", async () => {
    const wrapper = await mountRevenueByDepartment();

    const chart = wrapper.findComponent({ name: "UiChart" });

    expect(chart.exists()).toBe(true);

    expect(chart.props("type")).toBe("grouped-bar");
  });

  it("renders the date range picker in the header", async () => {
    const wrapper = await mountRevenueByDepartment();

    const dateRangePicker = wrapper.find("header").findComponent({
      name: "UiDateRangePicker",
    });

    expect(dateRangePicker.exists()).toBe(true);
  });

  it("passes the revenues to the chart in reversed order", async () => {
    const wrapper = await mountRevenueByDepartment();

    const chart = wrapper.getComponent({ name: "UiChart" });

    expect(chart.props("groupRecords")).toHaveLength(2);
    expect(chart.props("groupRecords").at(0).date).toContain("2026-04-02");
    expect(chart.props("groupRecords").at(1).date).toContain("2026-04-01");
  });
});
