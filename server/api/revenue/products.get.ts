import {
  ProductRevenueRecord,
  RevenueByProductResponse,
} from "~/types/revenue";
import products from "~~/server/data/products";
import productRevenuesByPeriod from "~~/server/data/productRevenuesByPeriod";
import { getPeriod, getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<RevenueByProductResponse> => {
    const query = getQuery(event);

    const period = getPeriod(query);

    const data = getPeriodData(query, productRevenuesByPeriod);

    const revenues: ProductRevenueRecord[] =
      data.revenues.map<ProductRevenueRecord>(({ product_id, revenue }) => {
        const product = products.find((product) => product.id === product_id);
        if (!product) {
          throw createError({
            statusCode: 500,
            message: `Revenue data references a product not found (product_id: ${product_id}).`,
          });
        }
        return { product, revenue };
      });

    return {
      data: {
        ...data,
        revenues,
      },
      meta: {
        locale: "en-US",
        period,
      },
    };
  },
);
