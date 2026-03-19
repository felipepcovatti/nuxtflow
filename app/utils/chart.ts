import type { DevicesChartRecord } from "~/types/chart";
import type { DeviceVisitsRecord } from "~/types/visits";

export function mapVisitsByDeviceToChartData(
  visits: DeviceVisitsRecord[],
): DevicesChartRecord[] {
  return [
    {
      index: 0,
      desktop: visits.find((visit) => visit.device === "desktop")?.visits ?? 0,
      mobile: visits.find((visit) => visit.device === "mobile")?.visits ?? 0,
      tablet: visits.find((visit) => visit.device === "tablet")?.visits ?? 0,
    },
  ];
}
