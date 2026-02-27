import { VisitsByDevice } from "~/types/visits";

export default {
  data: {
    devices: [
      { name: "mobile", visits: 312450 },
      { name: "desktop", visits: 185932 },
      { name: "tablet", visits: 43000 },
    ],
    total_visits: 541382,
    previous_total_visits: 621341,
  },
  meta: {
    period: "last-7-days",
  },
} satisfies VisitsByDevice;
