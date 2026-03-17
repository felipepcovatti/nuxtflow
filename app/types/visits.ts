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

export type Device = "mobile" | "desktop" | "tablet";

export interface DeviceVisitsRecord {
  device: Device;
  visits: number;
}

export interface PeriodDeviceVisits {
  total_visits: number;
  total_visits_growth_percentage: number;
  visits: DeviceVisitsRecord[];
}

export type DeviceVisitsInPeriod = Map<PeriodPreset, PeriodDeviceVisits>;

export type VisitsByDeviceResponse = {
  data: PeriodDeviceVisits;
  meta: {
    period: PeriodPreset;
  };
};
