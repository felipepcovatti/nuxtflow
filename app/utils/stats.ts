export function calculateGrowth({
  before,
  now,
}: {
  before: number;
  now: number;
}): number {
  return ((now - before) / Math.abs(before)) * 100;
}

export function getPercentage({
  value,
  total,
}: {
  value: number;
  total: number;
}): string {
  const percentage = (value / total) * 100;
  if (percentage === Infinity) return "∞";
  if (percentage === -Infinity) return "-∞";
  if (isNaN(percentage)) return "0%";
  return percentage.toFixed(1) + "%";
}
