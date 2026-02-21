import { faker } from "@faker-js/faker";
import { Product, ProductRevenue, Revenue, WeekRecord } from "~/types/revenue";

export default defineEventHandler(async (): Promise<Revenue> => {
  faker.seed(123);

  await new Promise((resolve) => {
    setTimeout(() => resolve(""), 1000);
  });

  const productNames = faker.helpers.uniqueArray(
    () => faker.commerce.productName(),
    3,
  );
  const products: Product[] = productNames.map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
  }));

  const week_records: WeekRecord[] = Array.from(new Array(7)).map(
    (_, index) => ({
      day_of_the_week: index,
      product_revenues: products.map<ProductRevenue>((products) => ({
        product_id: products.id,
        amount: Number(faker.finance.amount({ min: 1000, max: 2000 })),
      })),
    }),
  );

  return {
    total: week_records.reduce<number>((total, record) => {
      const recordTotal = record.product_revenues.reduce(
        (total, { amount: revenue }) => {
          return revenue + total;
        },
        0,
      );
      return total + recordTotal;
    }, 0),
    week_records,
    products,
  };
});
