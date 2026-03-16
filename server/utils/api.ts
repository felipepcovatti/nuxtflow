import { DATA_PERIODS, DataPeriod } from "~/constants/api";

export function getPeriod(query: EventHandlerRequest["query"]) {
  const period = DATA_PERIODS.find((period) => period === query?.period);
  if (!period) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid period requested",
    });
  }
  return period;
}

export function getPeriodData<Data>(
  query: EventHandlerRequest["query"],
  dataByPeriod: Map<DataPeriod, Data>,
) {
  const period = getPeriod(query);
  const data = dataByPeriod.get(period);
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Period data not found",
    });
  }
  return data;
}

const MINUTES_PER_PERIOD: Record<DataPeriod, number> = {
  "7D": 7 * 24 * 60,
  "30D": 30 * 24 * 60,
  "90D": 90 * 24 * 60,
  "1Y": 365 * 24 * 60,
};

export function filterByPeriod<T extends { date: string }>(
  items: readonly T[],
  period: DataPeriod,
): T[] {
  const now = Date.now();
  const periodMinutes = MINUTES_PER_PERIOD[period];
  const cutoff = now - periodMinutes * 60_000;

  return items.filter((item) => new Date(item.date).getTime() >= cutoff);
}

export interface RelativeDateItem {
  minutesAgo: number;
}

type AbsoluteDateItem<T> = Omit<T, "minutesAgo"> & {
  date: string;
};

export function toAbsoluteDateItems<T extends RelativeDateItem>(
  items: T[],
): AbsoluteDateItem<T>[] {
  const now = Date.now();

  return items.map<AbsoluteDateItem<T>>(({ minutesAgo, ...rest }) => {
    const timestamp = now - minutesAgo * 60_000;

    return {
      ...rest,
      date: new Date(timestamp).toISOString(),
    };
  });
}
