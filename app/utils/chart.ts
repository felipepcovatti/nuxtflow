import type {
  DepartmentRevenuesChartRecord,
  DevicesChartRecord,
} from "~/types/chart";
import type { DepartmentRevenuesByDate } from "~/types/revenue";
import type { DeviceVisitsRecord } from "~/types/visits";

export const mapDepartmentRevenuesToChartData = (
  data: DepartmentRevenuesByDate[],
): DepartmentRevenuesChartRecord[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();

  return data.map(({ date, revenues }) => {
    const revenueDate = new Date(date);
    revenueDate.setHours(0, 0, 0, 0);
    return {
      daysFromToday: Math.round(
        (revenueDate.getTime() - todayTime) / 86_400_000,
      ),
      date,
      ...revenues,
    };
  });
};

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
