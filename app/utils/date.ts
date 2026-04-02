import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  toCalendarDate,
  today,
} from "@internationalized/date";

export function getLocalTodayCalendarDate(): CalendarDate {
  return today(getLocalTimeZone());
}

export function toLocalCalendarDate(date: string): CalendarDate {
  return toCalendarDate(parseAbsoluteToLocal(date));
}
