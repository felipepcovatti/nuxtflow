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
  | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  actor: string;
  amount: number;
  status: TransactionStatus;
  date: string;
}

export interface TransactionResponse {
  data: {
    transactions: Transaction[];
  };
  meta: {
    period: string;
  };
}
