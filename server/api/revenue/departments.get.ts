import { RevenuesByDepartmentResponse } from "~/types/revenue";
import getDepartmentRevenues from "~~/server/data/departmentRevenues";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const { start, end } = getDateRange(query);

  const referenceTime = getHeader(event, "x-reference-time");

  if (!referenceTime) {
    throw createError({
      statusCode: 400,
      statusMessage: "x-reference-time header is required",
    });
  }

  const filteredDepartmentRevenues = filterItemsWithDateByDateRange(
    getDepartmentRevenues(referenceTime),
    { end, start },
  );

  const totalRevenue = filteredDepartmentRevenues.reduce(
    (total, { revenues }) => {
      const dayTotal =
        revenues.electronics +
        revenues.home_living +
        revenues.clothing_accessories;
      return total + dayTotal;
    },
    0,
  );

  return {
    data: {
      revenues: filteredDepartmentRevenues,
      total_revenue: totalRevenue,
    },
    meta: {
      period: {
        end,
        start,
      },
    },
  } satisfies RevenuesByDepartmentResponse;
});
