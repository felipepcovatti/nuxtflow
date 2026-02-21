export interface Product {
  id: string;
  name: string;
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
