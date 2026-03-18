import type { Department, RevenueApiRecord } from "./revenue";
import type { Device } from "./visits";

export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

export interface RevenueProductValue {
  product_id: string;
  amount: number;
}

export type DepartmentRevenuesChartRecord = {
  date: string;
  daysFromToday: number;
} & {
  [department in Department]: number;
};

export type DevicesChartRecord = {
  index: number;
} & {
  [deviceType in Device]: number;
};
