import type { RevenueRecord } from "~/types/chart";
import type { WeekRecord } from "~/types/revenue";

export function mapRevenueToChartData(records: WeekRecord[]): RevenueRecord[] {
  return records.map<RevenueRecord>((record) => {
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
