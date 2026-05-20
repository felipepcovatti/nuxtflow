import type { CalendarDate } from "@internationalized/date";

export type DateRangePreset = "7D" | "30D" | "90D" | "1Y";

export interface DateRange {
  start: string;
  end: string;
}

export interface CalendarDateRange {
  start: CalendarDate;
  end: CalendarDate;
}
