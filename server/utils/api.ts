import { PERIOD_PRESETS, PeriodPreset } from "~/constants/api";
import { addDays, addMinutes, format, formatISO, startOfToday } from "date-fns";

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

export interface MinutesFromNowItem {
  minutes_from_now: number;
}

type AbsoluteDatetime<T> = T & {
  datetime: string;
};

export function setDatetimeFromMinutesFromNow<T extends MinutesFromNowItem>(
  items: T[],
): AbsoluteDatetime<T>[] {
  const now = new Date();
  return items.map<AbsoluteDatetime<T>>((item) => {
    const date = addMinutes(now, item.minutes_from_now);
    return {
      ...item,
      datetime: formatISO(date),
    };
  });
}

export interface DaysFromTodayItem {
  days_from_today: number;
}

type AbsoluteDate<T> = T & {
  date: string;
};

export function setDateFromDaysFromToday<T extends DaysFromTodayItem>(
  items: T[],
): AbsoluteDate<T>[] {
  const today = startOfToday();
  return items.map<AbsoluteDate<T>>((item) => {
    const date = addDays(today, item.days_from_today);
    console.log(date);
    return {
      ...item,
      date: format(date, "yyyy-MM-dd"),
    };
  });
}
