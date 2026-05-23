import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useMoneyFormatter } from "./useMoneyFormatter";

const { mockedLocale } = vi.hoisted(() => ({
  mockedLocale: {
    value: "en-US",
  },
}));

mockNuxtImport("useI18n", () => () => ({
  locale: mockedLocale,
}));

describe("useMoneyFormatter", () => {
  beforeEach(() => {
    mockedLocale.value = "en-US";
  });

  it("formats rounded USD amounts for the active locale", () => {
    const { formatAsMoney } = useMoneyFormatter();

    expect(formatAsMoney(1234.56)).toBe("$1,235");
  });

  it("formats compact USD amounts with a single decimal place", () => {
    const { formatAsCompactMoney } = useMoneyFormatter();

    expect(formatAsCompactMoney(1_250_000)).toBe("$1.3M");
  });

  it("formats USD amounts for the en-CA locale", () => {
    mockedLocale.value = "en-CA";
    const { formatAsMoney, formatAsCompactMoney } = useMoneyFormatter();

    expect(formatAsMoney(9876)).toBe("US$9,876");
    expect(formatAsCompactMoney(9_876_000)).toBe("US$9.9M");
  });
});
