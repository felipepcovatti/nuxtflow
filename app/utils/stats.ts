export function calculateGrowth({
  before,
  now,
}: {
  before: number;
  now: number;
}): number {
  return ((now - before) / Math.abs(before)) * 100;
}
