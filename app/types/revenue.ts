export interface Product {
  id: string;
  name: string;
  image_url: string;
}

export interface ProductRevenue {
  product_id: string;
  amount: number;
}

export interface WeekRecord {
  day_of_the_week: number;
  product_revenues: ProductRevenue[];
}

export interface Revenue {
  total: number;
  week_records: WeekRecord[];
  products: Product[];
}

// types/revenue.ts

// These are 'Slugs' - The Frontend holds the translation keys for these
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

  // Home
  | "furniture"
  | "kitchen"
  | "lighting"

  // Clothing
  | "footwear"
  | "tops"
  | "bags";
export interface ProductStat {
  product: Product;
  department: DepartmentSlug;
  category: CategorySlug;
  revenue: number;
  previous_revenue: number;
}

export interface RevenueByProduct {
  data: {
    products: ProductStat[];
    total_revenue: number;
    previous_total_revenue: number;
  };
  meta: {
    period: string;
    locale: string;
  };
}

export interface RevenueByProductResponse {
  data: {
    products: ProductStat[];
    total_revenue: number;
    total_growth_percentage: number;
  };
  meta: {
    period: string;
    locale: string;
  };
}
