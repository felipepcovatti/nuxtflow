import { VisitsByCountryResponse } from "~/types/visits";
import visitsByCountry from "~~/server/data/visitsByCountry";
import { getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<VisitsByCountryResponse> => {
    const query = getQuery(event);
    const { data, period } = getPeriodData(query, visitsByCountry);
    return {
      data,
      meta: {
        period,
      },
    };
  },
);
