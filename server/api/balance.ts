import { faker } from "@faker-js/faker";
import { Balance } from "~/types/balance";

export default defineEventHandler(async (): Promise<Balance> => {
  faker.seed(123);

  await new Promise((resolve) => {
    setTimeout(() => resolve(""), 1000);
  });

  const income = Number(faker.finance.amount({ min: 100000, max: 200000 }));
  const outcome = Number(faker.finance.amount({ min: 50000, max: 80000 }));
  const newCustomers = faker.number.int({ min: 30, max: 40 });
  const incomeAverage = Number(
    faker.finance.amount({ min: income - 10000, max: income - 5000 }),
  );
  const outcomeAverage = Number(
    faker.finance.amount({ min: outcome + 5000, max: outcome + 10000 }),
  );
  const newCustomersAverage = faker.number.int({
    min: newCustomers + 5,
    max: newCustomers + 10,
  });

  return {
    current_month: {
      income,
      outcome,
      profit: income - outcome,
      new_customers: newCustomers,
    },
    last_three_months_average: {
      income: incomeAverage,
      outcome: outcomeAverage,
      profit: incomeAverage - outcomeAverage,
      new_customers: newCustomersAverage,
    },
  };
});
