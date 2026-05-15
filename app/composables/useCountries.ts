import type { PeriodPreset } from "~/constants/api";
import type { Country } from "~/types/visits";

const COUNTRIES_SHOWN_IN_LEGEND = 12;

export function useCountries() {
  const period = ref<PeriodPreset>("30D");

  const { data, pending } = useApi("/api/visits/countries", {
    query: { period },
  });

  const totalVisits = computed(() => data.value?.data.total_visits);

  const { locale } = useI18n({ useScope: "global" });

  const localCountryNames = computed(
    () => new Intl.DisplayNames([locale.value], { type: "region" }),
  );

  const { formatAsNumber } = useNumberFormatter();

  const countries = computed<Country[]>(() => {
    const getCountryColor = generateCountryColorGetter(
      data.value?.data.visits ?? [],
    );
    return (data.value?.data.visits ?? []).map((visit) => ({
      ...visit,
      icon: `flag:${visit.country.toLowerCase()}-4x3`,
      formattedVisits: formatAsNumber(visit.visits),
      name: localCountryNames.value.of(visit.country) ?? visit.country,
      color: getCountryColor(visit),
    }));
  });

  const highestVisitCountries = computed(() => {
    return countries.value
      .toSorted((a, b) => b.visits - a.visits)
      .slice(0, COUNTRIES_SHOWN_IN_LEGEND);
  });

  return {
    period,
    countries,
    pending,
    totalVisits,
    highestVisitCountries,
  };
}
