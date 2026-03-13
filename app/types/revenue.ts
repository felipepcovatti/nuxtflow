type DataPeriod = "7D" | "30D" | "90D" | "1Y";

export interface Product {
  id: string;
  name: string;
  slug: string;
  department: DepartmentSlug;
  category: CategorySlug;
}

export interface DepartmentRevenue {
  product_id: string;
  amount: number;
}

export interface WeekRecord {
  day_of_the_week: number;
  product_revenues: DepartmentRevenue[];
}

export interface Revenue {
  total: number;
  week_records: WeekRecord[];
  products: Product[];
}

export type DepartmentSlug =
  | "electronics"
  | "home_living"
  | "clothing_accessories";

export type CategorySlug =
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

export interface PeriodProductRevenue {
  revenues: {
    product_id: string;
    revenue: number;
  }[];
  total_revenue: number;
  total_revenue_growth_percentage: number;
}

export type ProductRevenuesInPeriod = Map<DataPeriod, PeriodProductRevenue>;

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
    period: DataPeriod;
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
