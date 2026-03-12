import { ProductRevenue, RevenueByProductResponse } from "~/types/revenue";
import { DATA_PERIODS } from "~/constants/api";
import products from "~~/server/data/products";
import productRevenuesByPeriod from "~~/server/data/productRevenuesByPeriod";

export default defineEventHandler(
  async (event): Promise<RevenueByProductResponse> => {
    const query = getQuery(event);

    const period = DATA_PERIODS.find((period) => period === query.period);

    if (!period) throw Error("Invalid period requested");

    const periodData = productRevenuesByPeriod.get(period);

    if (!periodData) throw Error("Period data not found");

    const revenues: ProductRevenue[] =
      periodData.revenues.flatMap<ProductRevenue>(({ product_id, revenue }) => {
        const product = products.find((product) => product.id === product_id);
        return product ? [{ product, revenue }] : [];
      });

    return {
      data: {
        ...periodData,
        revenues,
      },
      meta: {
        locale: "en-US",
        period,
      },
    };
  },
);
