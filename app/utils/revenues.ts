import type { ChartType } from "~/types/chart";

type RevenueChartType = Exclude<ChartType, "horizontal-stacked-bar">;

export function getRevenueByDepartmentChartType({
  days,
}: {
  days: number;
}): RevenueChartType {
  if (days <= 7) {
    return "grouped-bar";
  } else if (days <= 30) {
    return "stacked-bar";
  } else {
    return "stacked-area";
  }
}
