export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

export type RevenueRecord = {
  dayOfTheWeek: number;
} & {
  [productId: string]: number;
};
