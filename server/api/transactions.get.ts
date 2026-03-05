import transactions from "../data/transactions";

export default defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return transactions;
});
