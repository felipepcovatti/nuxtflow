import { VisitsByCountryResponse } from "../../../app/types/visits";
import visitsByCountry from "~~/server/data/visitsByCountry";
import { getPeriod, getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<VisitsByCountryResponse> => {
    const query = getQuery(event);
    const period = getPeriod(query);
    const data = getPeriodData(query, visitsByCountry);
    return {
      data,
      meta: {
        period,
      },
    };
  },
);
