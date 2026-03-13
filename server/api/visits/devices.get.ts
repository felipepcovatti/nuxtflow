import { VisitsByDeviceResponse } from "~/types/visits";
import visitsByDevice from "~~/server/data/visitsByDevice";
import { getPeriodData } from "~~/server/utils/api";

export default defineEventHandler(
  async (event): Promise<VisitsByDeviceResponse> => {
    const query = getQuery(event);
    const { data, period } = getPeriodData(query, visitsByDevice);
    return {
      data,
      meta: {
        period,
      },
    };
  },
);
