import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Index from "./index.vue";

describe("pages/index", () => {
  it("renders the overview child components", async () => {
    const wrapper = await mountSuspended(Index, { shallow: true });

    expect(
      wrapper.findComponent({ name: "OverviewRevenueByDepartment" }).exists(),
    ).toBe(true);
    expect(wrapper.findComponent({ name: "OverviewStats" }).exists()).toBe(
      true,
    );
    expect(
      wrapper.findComponent({ name: "OverviewVisitsByCountry" }).exists(),
    ).toBe(true);
    expect(
      wrapper.findComponent({ name: "OverviewVisitsByDevice" }).exists(),
    ).toBe(true);
    expect(
      wrapper.findComponent({ name: "OverviewRevenueByProduct" }).exists(),
    ).toBe(true);
    expect(
      wrapper.findComponent({ name: "OverviewTransactions" }).exists(),
    ).toBe(true);
  });
});
