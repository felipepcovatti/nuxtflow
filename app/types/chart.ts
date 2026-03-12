import type { RevenueApiRecord } from "./revenue";
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

export interface RevenueChartRecord {
  timestamp: number;
  point_info: RevenueApiRecord["point_info"];
  // Index signature allows for dynamic department keys like 'electronics' or 'sales'
  [key: string]: number | RevenueApiRecord["point_info"] | undefined;
}

export type DevicesChartRecord = {
  index: number;
} & {
  [deviceType in Device]: number;
};
