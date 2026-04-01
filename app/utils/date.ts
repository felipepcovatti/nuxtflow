import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

export function getToday(): CalendarDate {
  return today(getLocalTimeZone());
}
