import { DATA_PERIODS, DataPeriod } from "~/constants/api";

export function getPeriodData<Data>(
  query: EventHandlerRequest["query"],
  dataByPeriod: Map<DataPeriod, Data>,
) {
  const period = DATA_PERIODS.find((period) => period === query?.period);
  if (!period) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid period requested",
    });
  }
  const data = dataByPeriod.get(period);
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Period data not found",
    });
  }
  return {
    period,
    data,
  };
}
