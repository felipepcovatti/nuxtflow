import { describe, expect, it, vi } from "vitest";
import { useVisitsMap } from "./useVisitsMap";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

vi.mock("@unovis/ts", async () => {
  const actual = await vi.importActual("@unovis/ts");
  return {
    ...actual,
    TopoJSONMap: { selectors: { feature: "country" } },
  };
});

mockNuxtImport("useI18n", () => () => ({
  t: (key: string) => key,
}));

describe("useVisitsMap", () => {
  it("tooltip trigger renders country name and formatted visits", () => {
    const { tooltipTriggers } = useVisitsMap();
    const tooltipGetter = tooltipTriggers.value["country"];

    if (!tooltipGetter) {
      throw new Error("Tooltip trigger for 'country' selector is not defined");
    }

    const tooltip = tooltipGetter({
      data: {
        name: "Spain",
        formattedVisits: "1,234",
        color: "#ff0000",
        country: "ES",
        icon: "",
        visits: 1234,
      },
      id: "ES",
    });

    expect(tooltip).toBeInstanceOf(HTMLDivElement);
    expect(tooltip.textContent).toContain("Spain");
    expect(tooltip.textContent).toContain("1,234");
    expect(tooltip.textContent).toContain("visits");
  });

  it('tooltip trigger renders "0" visits when data is missing', () => {
    const { tooltipTriggers } = useVisitsMap();
    const tooltipGetter = tooltipTriggers.value["country"];

    if (!tooltipGetter) {
      throw new Error("Tooltip trigger for 'country' selector is not defined");
    }

    const tooltip = tooltipGetter({
      id: "FR",
    });

    expect(tooltip).toBeInstanceOf(HTMLDivElement);
    expect(tooltip.textContent).toContain("FR");
    expect(tooltip.textContent).toContain("0");
    expect(tooltip.textContent).toContain("visits");
  });
});
