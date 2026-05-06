import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useDateFormatter } from "./useDateFormatter";

const { mockedLocale, mockedUseI18n } = vi.hoisted(() => ({
  mockedLocale: {
    value: "en",
  },
  mockedUseI18n: vi.fn(() => ({
    locale: mockedLocale,
  })),
}));

mockNuxtImport("useI18n", () => mockedUseI18n);

describe("useDateFormatter", () => {
  const date = "2026-04-05T12:00:00.000Z";

  beforeEach(() => {
    mockedLocale.value = "en";
    mockedUseI18n.mockClear();
  });

  it("formats short dates for the active locale", () => {
    const { formatAsShortDate } = useDateFormatter();

    expect(mockedUseI18n).toHaveBeenCalledWith({ useScope: "global" });
    expect(formatAsShortDate(date)).toBe("Apr 5");
  });

  it("formats short dates with year", () => {
    const { formatAsShortDateWithYear } = useDateFormatter();

    expect(formatAsShortDateWithYear(date)).toBe("Apr 5, 2026");
  });

  it("formats full dates", () => {
    const { formatAsFullDate } = useDateFormatter();

    expect(formatAsFullDate(date)).toBe("Apr 5, 2026");
  });

  it("formats weekdays", () => {
    const { formatAsWeekday } = useDateFormatter();

    expect(formatAsWeekday(date)).toBe("Sunday");
  });

  it("formats date-only strings without shifting the calendar day", () => {
    const { formatAsShortDate } = useDateFormatter();

    expect(formatAsShortDate("2026-04-05")).toBe("Apr 5");
  });

  it("formats dates using the active locale without manual mapping", () => {
    mockedLocale.value = "pt-BR";
    const {
      formatAsShortDate,
      formatAsShortDateWithYear,
      formatAsFullDate,
      formatAsWeekday,
    } = useDateFormatter();

    expect(formatAsShortDate(date)).toBe("5 de abr.");
    expect(formatAsShortDateWithYear(date)).toBe("5 de abr. de 2026");
    expect(formatAsFullDate(date)).toBe("5 de abr. de 2026");
    expect(formatAsWeekday(date)).toBe("domingo");
  });
});
