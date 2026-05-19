import type { DateDuration } from "@internationalized/date";
import type { PeriodPreset } from "~/types/time";

export const PERIOD_PRESETS: ReadonlyArray<PeriodPreset> = [
  "7D",
  "30D",
  "90D",
  "1Y",
];

export const DURATION_BY_PRESET: Readonly<Record<PeriodPreset, DateDuration>> =
  {
    "7D": { days: 7 },
    "30D": { days: 30 },
    "90D": { days: 90 },
    "1Y": { years: 1 },
  };
