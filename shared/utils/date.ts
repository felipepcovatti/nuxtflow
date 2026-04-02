import { format } from "date-fns";

export function formatAsIsoWithDateOnly(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
