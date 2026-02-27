export interface CountryVisitsRecord {
  country: string;
  visits: number;
}

export interface VisitsByCountry {
  data: {
    countries: CountryVisitsRecord[];
    total_visits: number;
  };
  meta: {
    period: string;
  };
}

export type Device = "mobile" | "desktop" | "tablet";

export type DevicesVisitRecord = {
  name: Device;
  visits: number;
};

export type VisitsByDevice = {
  data: {
    devices: DevicesVisitRecord[];
    total_visits: number;
    previous_total_visits: number;
  };
  meta: {
    period: string;
  };
};
