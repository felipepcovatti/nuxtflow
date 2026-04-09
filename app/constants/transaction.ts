import type { TransactionStatus } from "~/types/transactions";

export const TRANSACTION_STATUSES: ReadonlyArray<TransactionStatus> = [
  "completed",
  "in_progress",
  "pending",
  "cancelled",
];
