import type { DeviceVisitsInPeriod } from "~/types/visits";

export default new Map([
  [
    "7D",
    {
      total_visits: 12457,
      total_visits_growth_percentage: 3.14,
      visits: {
        mobile: 7241,
        desktop: 4471,
        tablet: 745,
      },
    },
  ],
  [
    "30D",
    {
      total_visits: 52843,
      total_visits_growth_percentage: 8.42,
      visits: {
        mobile: 31258,
        desktop: 18412,
        tablet: 3173,
      },
    },
  ],
  [
    "90D",
    {
      total_visits: 148291,
      total_visits_growth_percentage: -2.18,
      visits: {
        mobile: 81622,
        desktop: 59302,
        tablet: 7367,
      },
    },
  ],
  [
    "1Y",
    {
      total_visits: 620542,
      total_visits_growth_percentage: 18.75,
      visits: {
        mobile: 373121,
        desktop: 216419,
        tablet: 31002,
      },
    },
  ],
]) satisfies DeviceVisitsInPeriod;
