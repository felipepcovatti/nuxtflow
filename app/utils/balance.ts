import type { Trend } from "~/types/balance";

export function calculateEvolution({
  before,
  now,
}: {
  before: number;
  now: number;
}): {
  result: string;
  trend: Trend;
} {
  if (before === now) {
    return { result: "=", trend: "constant" };
  }

  if (before === 0) {
    return { result: "∞", trend: "increase" };
  }

  const change = ((now - before) / Math.abs(before)) * 100;

  return {
    result: `${Math.abs(change).toFixed(1)}%`,
    trend: now > before ? "increase" : "decrease",
  };
}
