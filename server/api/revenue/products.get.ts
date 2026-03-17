import {
  ProductRevenueRecord,
  RevenueByProductResponse,
} from "~/types/revenue";
import { PERIOD_PRESETS } from "~/constants/api";
import products from "~~/server/data/products";
import productRevenuesByPeriod from "~~/server/data/productRevenuesByPeriod";
import { getPeriod, getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<RevenueByProductResponse> => {
    const query = getQuery(event);

    const period = getPeriod(query);

    const data = getPeriodData(query, productRevenuesByPeriod);

    const revenues: ProductRevenueRecord[] =
      data.revenues.flatMap<ProductRevenueRecord>(({ product_id, revenue }) => {
        const product = products.find((product) => product.id === product_id);
        return product ? [{ product, revenue }] : [];
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
