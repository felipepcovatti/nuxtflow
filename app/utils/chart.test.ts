import { describe, it, expect } from "vitest";
import type { WeekRecord } from "~/types/revenue";
import type { RevenueRecord } from "~/types/chart";

describe("mapRevenueToChartData", () => {
  it("maps a single record correctly", () => {
    const input: WeekRecord[] = [
      {
        day_of_the_week: 0,
        product_revenues: [
          { product_id: "p1", amount: 100 },
          { product_id: "p2", amount: 200 },
        ],
      },
    ];

    const result = mapRevenueToChartData(input);

    const expected: RevenueRecord[] = [
      {
        dayOfTheWeek: 0,
        p1: 100,
        p2: 200,
      },
    ];

    expect(result).toEqual(expected);
  });

  it("handles multiple days", () => {
    const input: WeekRecord[] = [
      {
        day_of_the_week: 0,
        product_revenues: [{ product_id: "p1", amount: 100 }],
      },
      {
        day_of_the_week: 1,
        product_revenues: [{ product_id: "p2", amount: 300 }],
      },
    ];

    const result = mapRevenueToChartData(input);

    expect(result).toEqual([
      { dayOfTheWeek: 0, p1: 100 },
      { dayOfTheWeek: 1, p2: 300 },
    ]);
  });

  it("returns empty array when input is empty", () => {
    const result = mapRevenueToChartData([]);
    expect(result).toEqual([]);
  });

  it("handles empty product_revenues", () => {
    const input: WeekRecord[] = [
      {
        day_of_the_week: 2,
        product_revenues: [],
      },
    ];

    const result = mapRevenueToChartData(input);

    expect(result).toEqual([{ dayOfTheWeek: 2 }]);
  });
});
