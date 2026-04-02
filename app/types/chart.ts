import type { Department } from "./revenue";
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
  days_from_today: number;
} & {
  [department in Department]: number;
};
