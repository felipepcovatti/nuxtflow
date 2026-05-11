import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCountries } from "./useCountries";

const { mockedUseApi, useCountriesState, mockedLocale } = vi.hoisted(() => ({
  mockedUseApi: vi.fn(),
  mockedLocale: { value: "en" },
  useCountriesState: {
    query: null as { period: { value: string } } | null,
  },
}));

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");

  return (url: string, options: { query: { period: { value: string } } }) => {
    useCountriesState.query = options.query;
    mockedUseApi(url, options);

    return {
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
    };
  };
});

mockNuxtImport("useI18n", () =>
  vi.fn(() => ({
    locale: mockedLocale,
  })),
);

describe("useCountries", () => {
  afterEach(() => {
    mockedUseApi.mockReset();
    mockedLocale.value = "en";
    useCountriesState.query = null;
  });

  it("calls the API with the default period and returns composed country data", () => {
    const { countries, pending, period, totalVisits } = useCountries();

    expect(mockedUseApi).toHaveBeenCalledTimes(1);
    expect(mockedUseApi).toHaveBeenCalledWith("/api/visits/countries", {
      query: useCountriesState.query,
    });
    expect(useCountriesState.query?.period).toBe(period);
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
