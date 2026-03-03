import { RevenueByProduct, RevenueByProductResponse } from "~/types/revenue";
import revenueByProduct from "~~/server/data/revenue-by-product";

export default defineEventHandler(
  async (): Promise<RevenueByProductResponse> => {
    const { total_revenue, previous_total_revenue, products } =
      revenueByProduct.data;

    const total_growth_percentage =
      previous_total_revenue === 0
        ? 0
        : ((total_revenue - previous_total_revenue) / previous_total_revenue) *
          100;

    return {
      data: {
        products,
        total_revenue,
        total_growth_percentage,
      },
      meta: revenueByProduct.meta,
    };
  },
);
