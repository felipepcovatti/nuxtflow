import type { DevicesChartRecord, RevenueChartRecord } from "~/types/chart";
import type { WeekRecord } from "~/types/revenue";
import type { DeviceVisitsRecord } from "~/types/visits";

export function mapRevenueToChartData(
  records: WeekRecord[],
): RevenueChartRecord[] {
  return records.map<RevenueChartRecord>((record) => {
    const { day_of_the_week, product_revenues } = record;
    const revenues = product_revenues.map((product) => [
      product.product_id,
      product.amount,
    ]);
    return {
      dayOfTheWeek: day_of_the_week,
      ...Object.fromEntries(revenues),
    };
  });
}

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
