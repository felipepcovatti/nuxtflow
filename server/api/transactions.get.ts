import { TransactionResponse } from "~/types/transactions";
import getTransactions from "../data/transactions";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Math.max(1, Number(query.page ?? 1));
  const pageSize = Math.max(1, Number(query.page_size ?? 10));
  const referenceTime = getHeader(event, "x-reference-time");

  const transactions = getTransactions(referenceTime);

  const status = query.status?.toString();

  const filteredTransactions = status
    ? transactions.filter((transaction) => transaction.status === status)
    : transactions;

  const search = String(query.search ?? "");

  const searchedTransactions = filteredTransactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase()),
  );

  const total = searchedTransactions.length;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedTransactions = searchedTransactions.slice(start, end);

  const pageCount = Math.ceil(total / pageSize);

  return {
    data: paginatedTransactions,
    meta: {
      page,
      page_size: pageSize,
      total,
      page_count: pageCount,
      locale: "en-US",
    },
  } satisfies TransactionResponse;
});
