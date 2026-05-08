import { describe, expect, it, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import VisitsByCountry from "./VisitsByCountry.vue";
import type { Country } from "~/types/visits";

mockNuxtImport("useCountries", async () => {
  const { ref } = await import("vue");
  return () => ({
    countries: ref<Country[]>([
      {
        country: "US",
        visits: 1200,
        formattedVisits: "1,200",
        name: "United States",
        icon: "flag:us-4x3",
        color: "#2563eb",
      },
      {
        country: "BR",
        visits: 800,
        formattedVisits: "800",
        name: "Brazil",
        icon: "flag:br-4x3",
        color: "#16a34a",
      },
    ]),
    highestVisitCountries: ref<Country[]>([
      {
        country: "US",
        visits: 1200,
        formattedVisits: "1,200",
        name: "United States",
        icon: "flag:us-4x3",
        color: "#2563eb",
      },
      {
        country: "BR",
        visits: 800,
        formattedVisits: "800",
        name: "Brazil",
        icon: "flag:br-4x3",
        color: "#16a34a",
      },
    ]),
    pending: ref(false),
    period: ref("30D"),
    totalVisits: ref<number | undefined>(2000),
  });
});

describe("VisitsByCountry", () => {
  it("renders the formatted summary, link, and period select", async () => {
    const wrapper = await mountSuspended(VisitsByCountry);

    expect(wrapper.text()).toContain("2,000");
    expect(wrapper.text()).toContain("Visits by country");

    const card = wrapper.getComponent({ name: "UiCard" });
    expect(card.props("link")).toEqual({
      label: "View country report",
      to: "/visits-report",
    });

    const periodSelect = wrapper.getComponent({ name: "PeriodSelect" });
    expect(periodSelect.props("modelValue")).toBe("30D");
    expect(periodSelect.props("bordered")).toBe(true);
  });

  it("forwards countries to the VisitsMap child", async () => {
    const wrapper = await mountSuspended(VisitsByCountry);

    const map = wrapper.getComponent({ name: "VisitsMap" });
    expect(map.props("countries")).toEqual([
      {
        country: "US",
        visits: 1200,
        formattedVisits: "1,200",
        name: "United States",
        icon: "flag:us-4x3",
        color: "#2563eb",
      },
      {
        country: "BR",
        visits: 800,
        formattedVisits: "800",
        name: "Brazil",
        icon: "flag:br-4x3",
        color: "#16a34a",
      },
    ]);
  });

  it("forwards countries and totalVisits to the VisitsByCountryList child", async () => {
    const wrapper = await mountSuspended(VisitsByCountry);

    const list = wrapper.getComponent({
      name: "OverviewVisitsByCountryList",
    });

    const countries = list.props("countries");
    expect(Array.isArray(countries)).toBe(true);
    expect(countries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          country: "US",
          visits: 1200,
          formattedVisits: "1,200",
        }),
        expect.objectContaining({
          country: "BR",
          visits: 800,
          formattedVisits: "800",
        }),
      ]),
    );

    expect(list.props("totalVisits")).toBe(2000);
  });
});
