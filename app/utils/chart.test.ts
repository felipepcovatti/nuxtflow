import { describe, it, expect } from "vitest";
import { chartGroupXGetter } from "./chart";

describe("app/utils/chart", () => {
  describe("chartGroupXGetter", () => {
    it.each([
      { index: 0, expected: 0 },
      { index: 1, expected: 1 },
      { index: -1, expected: -1 },
      { index: 2.5, expected: 2.5 },
    ])("returns $expected for index $index", ({ index, expected }) => {
      expect(chartGroupXGetter({}, index)).toBe(expected);
    });
  });
});
