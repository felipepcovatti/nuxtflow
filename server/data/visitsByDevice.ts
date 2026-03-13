import { DeviceVisitsInPeriod } from "~/types/visits";

export default new Map([
  [
    "7D",
    {
      total_visits: 12457,
      total_visits_growth_percentage: 3.14,
      visits: [
        { device: "mobile", visits: 7241 },
        { device: "desktop", visits: 4471 },
        { device: "tablet", visits: 745 },
      ],
    },
  ],
  [
    "30D",
    {
      total_visits: 52843,
      total_visits_growth_percentage: 8.42,
      visits: [
        { device: "mobile", visits: 31258 },
        { device: "desktop", visits: 18412 },
        { device: "tablet", visits: 3173 },
      ],
    },
  ],
  [
    "90D",
    {
      total_visits: 148291,
      total_visits_growth_percentage: -2.18,
      visits: [
        { device: "mobile", visits: 81622 },
        { device: "desktop", visits: 59302 },
        { device: "tablet", visits: 7367 },
      ],
    },
  ],
  [
    "1Y",
    {
      total_visits: 620542,
      total_visits_growth_percentage: 18.75,
      visits: [
        { device: "mobile", visits: 373121 },
        { device: "desktop", visits: 216419 },
        { device: "tablet", visits: 31002 },
      ],
    },
  ],
]) satisfies DeviceVisitsInPeriod;
