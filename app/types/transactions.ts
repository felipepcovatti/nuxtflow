export type TransactionType =
  | "payment_from"
  | "refund_to"
  | "payout_to"
  | "fee_logistic"
  | "adjustment_dispute"
  | "purchase_supply";

export type TransactionStatus =
  | "completed"
  | "in_progress"
  | "pending"
  | "cancelled";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  datetime: string;
}

export interface TransactionsQuery {
  page_size: number;
  page: number;
  search?: string;
  status?: TransactionStatus;
}

export interface TransactionResponse {
  data: Transaction[];
  meta: {
    page: number;
    page_size: number;
    total: number;
    locale: string;
  };
}
