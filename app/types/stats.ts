export interface Metric {
  last_30_days: number;
  previous_90_days_average: number;
}
export interface Stats {
  income: Metric;
  outcome: Metric;
  profit: Metric;
  new_customers: Metric;
}

export type Trend = "increase" | "decrease" | "constant";
