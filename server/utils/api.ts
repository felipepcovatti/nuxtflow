import {
  addDays,
  addMinutes,
  isAfter,
  isBefore,
  isEqual,
  isValid,
  parseISO,
} from "date-fns";
import { PERIOD_PRESETS, PeriodPreset } from "~/constants/api";

function isIsoDate(date: string): boolean {
  return isValid(parseISO(date));
}

export function getDateRange(query: EventHandlerRequest["query"]): {
  start: string;
  end: string;
} {
  const start = String(query?.start ?? "");
  const end = String(query?.end ?? "");

  if (!start || !end) {
    throw createError({
      statusCode: 400,
      statusMessage: "Start and end dates are required",
    });
  }

  if (!isIsoDate(start) || !isIsoDate(end)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Dates must be in ISO format",
    });
  }

  if (start > end) {
    throw createError({
      statusCode: 400,
      statusMessage: "Start date must be before end date",
    });
  }
  return { start, end };
}

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

export function filterItemsWithDateByDateRange<T extends { date: string }>(
  items: T[],
  period: {
    start: string;
    end: string;
  },
): T[] {
  return items.filter(({ date }) => {
    return (
      (isBefore(date, period.end) && isAfter(date, period.start)) ||
      isEqual(date, period.start) ||
      isEqual(date, period.end)
    );
  });
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

export interface DaysFromReferenceTimeItem {
  days_from_reference_time: number;
}

type AbsoluteDate<T> = Omit<T, "days_from_reference_time"> & {
  date: string;
};

export function setDateFromDaysFromReferenceTime<
  T extends DaysFromReferenceTimeItem,
>(items: T[], referenceTime: string): AbsoluteDate<T>[] {
  const reference = referenceTime;
  return items.map<AbsoluteDate<T>>(({ days_from_reference_time, ...item }) => {
    return {
      ...item,
      date: addDays(reference, days_from_reference_time).toISOString(),
    };
  });
}

export interface MinutesFromReferenceTimeItem {
  minutes_from_reference_time: number;
}

type AbsoluteDatetime<T> = Omit<T, "minutes_from_reference_time"> & {
  datetime: string;
};

export function setDatetimeFromMinutesFromNow<
  T extends MinutesFromReferenceTimeItem,
>(items: T[], referenceTime?: string): AbsoluteDatetime<T>[] {
  const reference = parseISO(referenceTime || new Date().toISOString());
  return items.map<AbsoluteDatetime<T>>(
    ({ minutes_from_reference_time, ...item }) => {
      return {
        ...item,
        datetime: addMinutes(
          reference,
          minutes_from_reference_time,
        ).toISOString(),
      };
    },
  );
}
