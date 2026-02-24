import type { Trend } from "~/types/balance";

export const useBalanceEvolution = (
  getBalance: () => { before: number; now: number },
  { invertedSentiment }: { invertedSentiment?: boolean } = {},
) => {
  const evolution = computed(() => calculateEvolution(getBalance()));

  const colorByTrend: Record<Trend, string> = {
    increase: invertedSentiment
      ? "var(--color-red-500)"
      : "var(--color-green-500)",
    decrease: invertedSentiment
      ? "var(--color-green-500)"
      : "var(--color-red-500)",
    constant: "var(--color-gray-400)",
  };

  const color = computed<string>(() => colorByTrend[evolution.value.trend]);

  const arrowIcon = computed(() => {
    if (evolution.value.trend === "constant") return null;
    return evolution.value.trend === "increase"
      ? "flowbite:arrow-up-outline"
      : "flowbite:arrow-down-outline";
  });

  return {
    color,
    evolution,
    arrowIcon,
  };
};
