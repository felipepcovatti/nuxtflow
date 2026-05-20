import type { DateDuration } from "@internationalized/date";
import type { DateRangePreset } from "~/types/date";

export const DATE_RANGE_PRESETS: ReadonlyArray<DateRangePreset> = [
  "7D",
  "30D",
  "90D",
  "1Y",
];

export const DURATION_BY_DATE_RANGE_PRESET: Readonly<
  Record<DateRangePreset, DateDuration>
> = {
  "7D": { days: 7 },
  "30D": { days: 30 },
  "90D": { days: 90 },
  "1Y": { years: 1 },
};
