import { TransactionResponse } from "~/types/transactions";
import transactions from "../data/transactions";
import { filterByPeriod, getPeriod, toAbsoluteDateItems } from "../utils/api";

export default defineEventHandler(
  async (event): Promise<TransactionResponse> => {
    const query = getQuery(event);

    const period = getPeriod(query);

    const page = Math.max(1, Number(query.page ?? 1));
    const pageSize = Math.max(1, Number(query.pageSize ?? 10));

    const filteredTransactions = filterByPeriod(transactions, period);

    const total = filteredTransactions.length;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedTransactions = filteredTransactions.slice(start, end);

    return {
      data: paginatedTransactions,
      meta: {
        period,
        page,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      },
    };
  },
);
