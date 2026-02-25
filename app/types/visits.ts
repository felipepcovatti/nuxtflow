export interface CountryVisitsRecord {
  country: string;
  visits: number;
}

export interface VisitsByCountry {
  countries: CountryVisitsRecord[];
  total_visits: number;
}
