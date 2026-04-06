import type { PeriodPreset } from "~/constants/api";

export interface CountryVisitsRecord {
  country: string;
  visits: number;
}

export interface PeriodCountryVisits {
  total_visits: number;
  visits: CountryVisitsRecord[];
}

export type CountryVisitsInPeriod = Map<PeriodPreset, PeriodCountryVisits>;

export interface VisitsByCountryResponse {
  data: PeriodCountryVisits;
  meta: {
    period: PeriodPreset;
  };
}
