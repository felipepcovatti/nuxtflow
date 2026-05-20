import type { DateRangePreset } from "~/types/date";

export interface CountryVisitsRecord {
  country: string;
  visits: number;
}

export interface PeriodCountryVisits {
  total_visits: number;
  visits: CountryVisitsRecord[];
}

export type CountryVisitsInPeriod = Map<DateRangePreset, PeriodCountryVisits>;

export interface VisitsByCountryResponse {
  data: PeriodCountryVisits;
  meta: {
    period: DateRangePreset;
  };
}

export type Device = "mobile" | "desktop" | "tablet";

export type DeviceVisits = {
  [device in Device]: number;
};

export interface PeriodDeviceVisits {
  total_visits: number;
  total_visits_growth_percentage: number;
  visits: DeviceVisits;
}

export type DeviceVisitsInPeriod = Map<DateRangePreset, PeriodDeviceVisits>;

export type VisitsByDeviceResponse = {
  data: PeriodDeviceVisits;
  meta: {
    period: DateRangePreset;
  };
};

export interface Country extends CountryVisitsRecord {
  name: string;
  color: string;
  formattedVisits: string;
  icon: string;
}
