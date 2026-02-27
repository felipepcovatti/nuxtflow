import type { DevicesChartRecord, RevenueChartRecord } from "~/types/chart";
import type { WeekRecord } from "~/types/revenue";
import type { DevicesVisitRecord } from "~/types/visits";

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
  devices: DevicesVisitRecord[],
): DevicesChartRecord[] {
  return [
    {
      index: 0,
      desktop: devices.find((device) => device.name === "desktop")?.visits ?? 0,
      mobile: devices.find((device) => device.name === "mobile")?.visits ?? 0,
      tablet: devices.find((device) => device.name === "tablet")?.visits ?? 0,
    },
  ];
}
