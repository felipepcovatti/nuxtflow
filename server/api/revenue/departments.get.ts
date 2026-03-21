import { RevenuesByDepartmentResponse } from "~/types/revenue";
import departmentRevenues from "~~/server/data/departmentRevenuesByDay";
import { filterItemsWithDateByDateRange } from "~~/server/utils/api";
import { format, subDays } from "date-fns";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const fallbackDate = new Date();
  const today = format(fallbackDate, "yyyy-MM-dd");
  const oneYearAgo = format(subDays(fallbackDate, 365), "yyyy-MM-dd");

  const queryStart = String(query.start ?? "");
  const queryEnd = String(query.end ?? "");

  const start = isoDateRegex.test(queryStart) ? queryStart : oneYearAgo;
  const end = isoDateRegex.test(queryEnd) ? queryEnd : today;

  const filteredDepartmentRevenues = filterItemsWithDateByDateRange(
    departmentRevenues,
    { end, start },
  );

  return {
    data: {
      revenues: filteredDepartmentRevenues,
      total_revenue: departmentRevenues.reduce((total, { revenues }) => {
        const dayTotal =
          revenues.electronics +
          revenues.home_living +
          revenues.clothing_accessories;
        return total + dayTotal;
      }, 0),
    },
    meta: {
      period: {
        end,
        start,
      },
    },
  } satisfies RevenuesByDepartmentResponse;
});
