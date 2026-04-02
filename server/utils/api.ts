import {
  addDays,
  isAfter,
  isBefore,
  isEqual,
  isValid,
  parseISO,
} from "date-fns";

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
