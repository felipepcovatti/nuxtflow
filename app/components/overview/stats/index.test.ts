import { describe, it, expect } from "vitest";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import Index from "./index.vue";
import type { Stats } from "~/types/stats";
import type { StatsCardProps } from "./Card.vue";

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref<Stats>({
      income: { last_30_days: 100000, previous_90_days_average: 90000 },
      outcome: { last_30_days: 50000, previous_90_days_average: 55000 },
      profit: { last_30_days: 50000, previous_90_days_average: 35000 },
      new_customers: { last_30_days: 150, previous_90_days_average: 120 },
    }),
    pending: ref(false),
  });
});

describe("OverviewStats", () => {
  it("renders 4 stat cards", async () => {
    const wrapper = await mountSuspended(Index);
    const cards = wrapper.findAllComponents({ name: "OverviewStatsCard" });
    expect(cards).toHaveLength(4);
  });

  const cards: StatsCardProps[] = [
    {
      title: "Total Income",
      icon: "flowbite:chart-mixed-dollar-solid",
      money: true,
      data: { last_30_days: 100000, previous_90_days_average: 90000 },
      invertedSentiment: false,
    },
    {
      title: "Total Outcome",
      icon: "flowbite:chart-line-down-outline",
      money: true,
      invertedSentiment: true,
      data: { last_30_days: 50000, previous_90_days_average: 55000 },
    },
    {
      title: "Total Profit",
      icon: "flowbite:dollar-solid",
      money: true,
      invertedSentiment: false,
      data: { last_30_days: 50000, previous_90_days_average: 35000 },
    },
    {
      title: "New Customers",
      icon: "flowbite:users-group-solid",
      data: { last_30_days: 150, previous_90_days_average: 120 },
      money: false,
      invertedSentiment: false,
    },
  ];

  it.each(cards.map((props, index) => ({ index, ...props })))(
    "renders $title in the correct card with appropriate props",
    async ({ index, ...props }) => {
      const wrapper = await mountSuspended(Index);
      const card = wrapper.findAllComponents({ name: "OverviewStatsCard" })[
        index
      ];

      expect(card?.props()).toMatchObject(props);
    },
  );
});
