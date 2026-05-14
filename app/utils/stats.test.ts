import { describe, it, expect } from "vitest";
import { calculateGrowth, getPercentage } from "./stats";

describe("calculateGrowth", () => {
  it.each([
    { before: 100, now: 150, expected: 50 },
    { before: 200, now: 100, expected: -50 },
    { before: -100, now: -50, expected: 50 },
    { before: 0, now: 100, expected: Infinity },
    { before: 0, now: -100, expected: -Infinity },
    { before: 0, now: 0, expected: 0 },
    { before: 100, now: 0, expected: -100 },
  ])(
    "returns $expected for before $before and now $now",
    ({ before, now, expected }) => {
      expect(calculateGrowth({ before, now })).toBe(expected);
    },
  );
});

describe("getPercentage", () => {
  it.each([
    { value: 50, total: 200, expected: "25.0%" },
    { value: 1, total: 3, expected: "33.3%" },
    { value: -50, total: 200, expected: "-25.0%" },
    { value: 0, total: 0, expected: "0%" },
    { value: 1, total: 0, expected: "∞" },
    { value: -1, total: 0, expected: "-∞" },
  ])("formats $value/$total as $expected", ({ value, total, expected }) => {
    expect(getPercentage({ value, total })).toBe(expected);
  });
});
