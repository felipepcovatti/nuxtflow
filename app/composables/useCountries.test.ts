import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCountries } from "./useCountries";

const { mockedLocale } = vi.hoisted(() => ({
  mockedLocale: { value: "en" },
}));

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref({
      data: {
        total_visits: 4000,
        visits: [
          { country: "US", visits: 1500 },
          { country: "BR", visits: 2500 },
        ],
      },
      meta: {
        period: "30D",
      },
    }),
    pending: ref(false),
  });
});

mockNuxtImport("useI18n", () => () => ({
  locale: mockedLocale,
}));

describe("useCountries", () => {
  afterEach(() => {
    mockedLocale.value = "en";
  });

  it("returns composed country data and state", () => {
    const { countries, pending, period, totalVisits } = useCountries();
    expect(period.value).toBe("30D");
    expect(totalVisits.value).toBe(4000);
    expect(pending.value).toBe(false);
    expect(countries.value).toEqual([
      {
        country: "US",
        visits: 1500,
        formattedVisits: "1,500",
        name: "United States",
        icon: "flag:us-4x3",
        color: "var(--color-primary-200)",
      },
      {
        country: "BR",
        visits: 2500,
        formattedVisits: "2,500",
        name: "Brazil",
        icon: "flag:br-4x3",
        color: "var(--color-primary-900)",
      },
    ]);
  });

  it("returns the countries sorted for the legend", () => {
    const { highestVisitCountries } = useCountries();
    expect(
      highestVisitCountries.value.map((country) => country.country),
    ).toEqual(["BR", "US"]);
  });

  it("initial formattedVisits and names for default locale (en)", () => {
    const { countries } = useCountries();
    expect(countries.value.at(0)?.formattedVisits).toBe("1,500");
    expect(countries.value.at(0)?.name).toBe("United States");
    expect(countries.value.at(1)?.formattedVisits).toBe("2,500");
    expect(countries.value.at(1)?.name).toBe("Brazil");
  });

  it("returns localized formattedVisits and names for pt locale", () => {
    mockedLocale.value = "pt";
    const { countries } = useCountries();
    expect(countries.value.at(0)?.formattedVisits).toBe("1.500");
    expect(countries.value.at(0)?.name).toBe("Estados Unidos");
    expect(countries.value.at(1)?.formattedVisits).toBe("2.500");
    expect(countries.value.at(1)?.name).toBe("Brasil");
  });
});
