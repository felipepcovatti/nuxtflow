import type { Device } from "./visits";

export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

export type RevenueChartRecord = {
  dayOfTheWeek: number;
} & {
  [productId: string]: number;
};

export type DevicesChartRecord = {
  index: number;
} & {
  [deviceType in Device]: number;
};
