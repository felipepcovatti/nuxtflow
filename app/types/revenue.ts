import type { PeriodPreset } from "~/constants/api";

export type Department = "electronics" | "home_living" | "clothing_accessories";

export type Category =
  // Electronics
  | "audio"
  | "peripherals"
  | "devices"
  | "charging"

  // Home & Office
  | "furniture"
  | "kitchen"
  | "lighting"
  | "stationery"
  | "decor"
  | "wellness"

  // Clothing & Lifestyle
  | "footwear"
  | "tops"
  | "bags"
  | "outerwear";

export interface Product {
  id: string;
  name: string;
  slug: string;
  department: Department;
  category: Category;
}

export type DepartmentRevenuesByDate = {
  date: string;
  revenues: {
    [department in Department]: number;
  };
};

export interface RevenuesByDepartmentResponse {
  data: {
    revenues: DepartmentRevenuesByDate[];
    total_revenue: number;
  };
  meta: {
    period: {
      start: string;
      end: string;
    };
  };
}

export interface PeriodProductRevenue {
  revenues: {
    product_id: string;
    revenue: number;
  }[];
  total_revenue: number;
  total_revenue_growth_percentage: number;
}

export type ProductRevenuesInPeriod = Map<PeriodPreset, PeriodProductRevenue>;

export interface ProductRevenueRecord {
  revenue: number;
  product: Product;
}

export interface RevenueByProductResponse {
  data: {
    revenues: ProductRevenueRecord[];
    total_revenue: number;
    total_revenue_growth_percentage: number;
  };
  meta: {
    period: PeriodPreset;
    locale: string;
  };
}

export interface DepartmentValue {
  department_id: string;
  amount: number;
}

export interface RevenueApiRecord {
  timestamp: number;
  date: string;
  point_info: {
    year: number;
    month: number;
    day?: number;
    week?: number;
  };
  values: DepartmentValue[];
}
