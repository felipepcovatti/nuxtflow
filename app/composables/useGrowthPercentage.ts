import type { Trend } from "~/types/stats";

export const useGrowthPercentage = (
  getValue: () => number,
  { invertedSentiment }: { invertedSentiment?: boolean } = {},
) => {
  const value = computed(() => getValue());

  const percentage = computed(() =>
    getPercentage({
      value: Math.abs(value.value),
      total: 100,
    }),
  );

  const trend = computed<Trend>(() => {
    if (!value.value) return "constant";
    return value.value > 0 ? "increase" : "decrease";
  });

  const colorByTrend: Record<Trend, string> = {
    increase: invertedSentiment
      ? "var(--color-red-500)"
      : "var(--color-green-500)",
    decrease: invertedSentiment
      ? "var(--color-green-500)"
      : "var(--color-red-500)",
    constant: "var(--color-gray-400)",
  };

  const color = computed<string>(() => colorByTrend[trend.value]);

  const arrowIcon = computed(() => {
    if (trend.value === "constant") return null;
    return trend.value === "increase"
      ? "flowbite:arrow-up-outline"
      : "flowbite:arrow-down-outline";
  });

  return {
    color,
    percentage,
    arrowIcon,
  };
};
