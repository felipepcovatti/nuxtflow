import type { CalendarDate } from "@internationalized/date";
import {
  CalendarDateTime,
  getLocalTimeZone,
  isEqualDay,
  parseAbsoluteToLocal,
  toCalendarDate,
  today,
} from "@internationalized/date";
import {
  DURATION_BY_DATE_RANGE_PRESET,
  DATE_RANGE_PRESETS,
} from "~/constants/date";
import type {
  CalendarDateRange,
  DateRange,
  DateRangePreset,
} from "~/types/date";

export function getLocalTodayCalendarDate(): CalendarDate {
  return today(getLocalTimeZone());
}

export function getLocalOneYearAgoCalendarDate(): CalendarDate {
  const today = getLocalTodayCalendarDate();
  return today.subtract({ years: 1 }).add({ days: 1 });
}

export function getLocalCalendarDateFromDate(date: string): CalendarDate {
  return toCalendarDate(parseAbsoluteToLocal(date));
}

export function getLocalDateRangeFromCalendarDateRange({
  end,
  start,
}: CalendarDateRange): DateRange {
  return {
    start: new CalendarDateTime(start.year, start.month, start.day, 0, 0, 0, 0)
      .toDate(getLocalTimeZone())
      .toISOString(),
    end: new CalendarDateTime(end.year, end.month, end.day, 23, 59, 59, 999)
      .toDate(getLocalTimeZone())
      .toISOString(),
  };
}

export function getLocal7DaysDateRange(): DateRange {
  const calendarRange = getLocalCalendarDateRangeFromPreset("7D");
  return getLocalDateRangeFromCalendarDateRange(calendarRange);
}

export function getLocalDateRangeFromPreset(
  preset: DateRangePreset,
): DateRange {
  const calendarRange = getLocalCalendarDateRangeFromPreset(preset);
  return getLocalDateRangeFromCalendarDateRange(calendarRange);
}

export function getLocalCalendarDateRangeFromDateRange({
  start,
  end,
}: DateRange): CalendarDateRange {
  return {
    start: getLocalCalendarDateFromDate(start),
    end: getLocalCalendarDateFromDate(end),
  };
}

export function getLocalCalendarDateRangeFromPreset(
  preset: DateRangePreset,
): CalendarDateRange {
  const duration = DURATION_BY_DATE_RANGE_PRESET[preset];
  const end = getLocalTodayCalendarDate();
  return {
    start: end.subtract(duration).add({ days: 1 }),
    end,
  };
}

export function getPresetFromCalendarDateRange({
  start,
  end,
}: CalendarDateRange): DateRangePreset | undefined {
  const preset = DATE_RANGE_PRESETS.find((preset) => {
    const presetRange = getLocalCalendarDateRangeFromPreset(preset);
    return (
      isEqualDay(start, presetRange.start) && isEqualDay(end, presetRange.end)
    );
  });
  return preset;
}
