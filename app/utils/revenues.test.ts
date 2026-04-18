import { describe, it, expect } from "vitest";
import { getRevenueByDepartmentChartType } from "./revenues";

describe("getRevenueByDepartmentChartType", () => {
  it.each([
    { days: 7, expected: "grouped-bar" },
    { days: 8, expected: "stacked-bar" },
    { days: 30, expected: "stacked-bar" },
    { days: 31, expected: "stacked-area" },
  ])("returns $expected for $days days", ({ days, expected }) => {
    expect(getRevenueByDepartmentChartType({ days })).toBe(expected);
  });
});
