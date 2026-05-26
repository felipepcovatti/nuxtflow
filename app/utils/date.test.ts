import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getLocalTodayCalendarDate,
  getLocalCalendarDateFromDate,
} from "./date";

const { mockedToday } = vi.hoisted(() => ({
  mockedToday: vi.fn(() => ({ year: 2026, month: 5, day: 14 })),
}));

vi.mock("@internationalized/date", async () => {
  const actual = await vi.importActual("@internationalized/date");
  return {
    ...actual,
    today: mockedToday,
  };
});

describe("app/utils/date", () => {
  beforeEach(() => {
    mockedToday.mockClear();
  });

  describe("getLocalTodayCalendarDate", () => {
    it("returns today's CalendarDate using the local timezone", () => {
      const localTodayCaneldarDate = getLocalTodayCalendarDate();
      expect(mockedToday).toHaveBeenCalledTimes(1);
      expect(mockedToday).toHaveBeenCalledWith("UTC");
      expect(localTodayCaneldarDate).toEqual({ year: 2026, month: 5, day: 14 });
    });
  });

  describe("toLocalCalendarDate", () => {
    it.each([
      ["2026-05-14T17:05:52.138-03:00", { year: 2026, month: 5, day: 14 }],
      ["2024-01-01T00:00:00Z", { year: 2024, month: 1, day: 1 }],
      ["1999-12-31T23:59:59-05:00", { year: 2000, month: 1, day: 1 }],
      ["2000-01-01T00:30:00+05:30", { year: 1999, month: 12, day: 31 }],
      ["2020-02-29T23:00:00+02:00", { year: 2020, month: 2, day: 29 }],
      ["2021-03-14T02:30:00-08:00", { year: 2021, month: 3, day: 14 }],
      ["2018-07-01T00:00:00+00:00", { year: 2018, month: 7, day: 1 }],
      ["2045-11-30T15:45:00Z", { year: 2045, month: 11, day: 30 }],
    ])("converts %s to %o", (date, expected) => {
      const localCalendarDate = getLocalCalendarDateFromDate(date);

      expect(localCalendarDate).toMatchObject(expected);
    });
  });
});
