import type { VisitsByDeviceResponse } from "~/types/visits";
import visitsByDevice from "~~/server/data/visitsByDevice";
import { getPeriod, getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<VisitsByDeviceResponse> => {
    const query = getQuery(event);
    const period = getPeriod(query);
    const data = getPeriodData(query, visitsByDevice);
    return {
      data,
      meta: {
        period,
      },
    };
  },
);
