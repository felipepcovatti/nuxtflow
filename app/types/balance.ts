interface BalanceData {
  income: number;
  outcome: number;
  profit: number;
  new_customers: number;
}
export interface Balance {
  current_month: BalanceData;
  last_three_months_average: BalanceData;
}

export type Trend = "increase" | "decrease" | "constant";
