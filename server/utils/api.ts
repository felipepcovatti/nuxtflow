import { PERIOD_PRESETS, PeriodPreset } from "~/constants/api";

export function getPeriod(query: EventHandlerRequest["query"]) {
  const period = PERIOD_PRESETS.find((period) => period === query?.period);
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
  dataByPeriod: Map<PeriodPreset, Data>,
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

const MINUTES_PER_PERIOD: Record<PeriodPreset, number> = {
  "7D": 7 * 24 * 60,
  "30D": 30 * 24 * 60,
  "90D": 90 * 24 * 60,
  "1Y": 365 * 24 * 60,
};

export function filterItemsWithDatetimeByPeriod<T extends { datetime: string }>(
  items: T[],
  period: PeriodPreset,
): T[] {
  const now = Date.now();
  const periodMinutes = MINUTES_PER_PERIOD[period];
  const cutoff = now - periodMinutes * 60_000;

  return items.filter((item) => new Date(item.datetime).getTime() >= cutoff);
}

export function filterItemsWithDateByDateRange<T extends { date: string }>(
  items: T[],
  period: {
    start: string;
    end: string;
  },
): T[] {
  return items.filter(({ date }) => date >= period.start && date <= period.end);
}

export interface MinutesAgoItem {
  minutes_ago: number;
}

type AbsoluteDatetimeWithoutMinutesAgo<T> = Omit<T, "minutes_ago"> & {
  datetime: string;
};

export function fromMinutesAgoToAbsoluteDatetimeItems<T extends MinutesAgoItem>(
  items: T[],
): AbsoluteDatetimeWithoutMinutesAgo<T>[] {
  const now = Date.now();

  return items.map<AbsoluteDatetimeWithoutMinutesAgo<T>>(
    ({ minutes_ago, ...rest }) => {
      const timestamp = now - minutes_ago * 60_000;

      return {
        ...rest,
        datetime: new Date(timestamp).toISOString(),
      };
    },
  );
}

export interface DaysAgoItem {
  days_ago: number;
}

type AbsoluteDateWithoutDaysAgo<T> = Omit<T, "days_ago"> & {
  date: string;
};

export function fromDaysAgoToAbsoluteDayItems<T extends DaysAgoItem>(
  items: T[],
): AbsoluteDateWithoutDaysAgo<T>[] {
  const now = Date.now();

  return items.map<AbsoluteDateWithoutDaysAgo<T>>(({ days_ago, ...rest }) => {
    const timestamp = now - days_ago * 86_400_000;

    return {
      ...rest,
      date: new Date(timestamp).toISOString().slice(0, 10),
    };
  });
}
