export type BarChartType =
  | "grouped-bar"
  | "stacked-bar"
  | "horizontal-stacked-bar";

export type ChartType = BarChartType | "stacked-area";
export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

export interface ChartItem<ItemId extends string> {
  id: ItemId;
  label: string;
  color: string;
}
