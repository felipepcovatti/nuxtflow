import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useNumberFormatter } from "./useNumberFormatter";

const { mockedLocale } = vi.hoisted(() => ({
  mockedLocale: {
    value: "en-US",
  },
}));

mockNuxtImport("useI18n", () => () => ({
  locale: mockedLocale,
}));

describe("useNumberFormatter", () => {
  beforeEach(() => {
    mockedLocale.value = "en-US";
  });

  it("formats numbers for the active locale", () => {
    const { formatAsNumber } = useNumberFormatter();

    expect(formatAsNumber(1234.56)).toBe("1,234.56");
  });

  it("formats compact numbers with a single decimal place", () => {
    const { formatAsCompactNumber } = useNumberFormatter();

    expect(formatAsCompactNumber(1_250_000)).toBe("1.3M");
  });

  it("formats percentages using the number formatter output", () => {
    const { formatAsPercentage } = useNumberFormatter();

    expect(formatAsPercentage(1234.56)).toBe("1,234.56%");
  });

  it("formats values using locale-specific numerals and compact notation", () => {
    mockedLocale.value = "ar-EG";
    const { formatAsNumber, formatAsCompactNumber, formatAsPercentage } =
      useNumberFormatter();

    expect(formatAsNumber(9_876_543)).toBe("٩٬٨٧٦٬٥٤٣");
    expect(formatAsCompactNumber(9_876_543)).toBe("٩٫٩\u00a0مليون");
    expect(formatAsPercentage(1234.56)).toBe("١٬٢٣٤٫٥٦%");
  });
});
