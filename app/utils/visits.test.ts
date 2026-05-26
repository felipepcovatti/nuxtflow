import { describe, expect, it, vi } from "vitest";
import {
  visitsMapCountryCodeGetter,
  visitsMapCountryColorGetter,
  generateCountryColorGetter,
} from "./visits";

vi.mock("~/constants/visits", () => ({
  COUNTRY_COLORS: ["#111111", "#222222", "#333333"],
  DEFAULT_COUNTRY_COLOR: "#000000",
}));

describe("utils/visits", () => {
  describe("generateCountryColorGetter", () => {
    it("returns the default color for zero visits", () => {
      const colorGetter = generateCountryColorGetter([
        { country: "US", visits: 0 },
        { country: "BR", visits: 100 },
      ]);
      expect(colorGetter({ country: "US", visits: 0 })).toBe("#000000");
    });
    it("returns the middle color for equal visits", () => {
      const colorGetter = generateCountryColorGetter([
        { country: "US", visits: 100 },
        { country: "BR", visits: 100 },
      ]);
      expect(colorGetter({ country: "US", visits: 100 })).toBe("#222222");
    });
    it("returns the correct color based on visits", () => {
      const colorGetter = generateCountryColorGetter([
        { country: "US", visits: 0 },
        { country: "BR", visits: 100 },
        { country: "FR", visits: 50 },
        { country: "DE", visits: 75 },
      ]);
      expect(colorGetter({ country: "US", visits: 0 })).toBe("#000000");
      expect(colorGetter({ country: "FR", visits: 50 })).toBe("#111111");
      expect(colorGetter({ country: "DE", visits: 75 })).toBe("#222222");
      expect(colorGetter({ country: "BR", visits: 100 })).toBe("#333333");
    });
  });

  describe("visitsMapCountryCodeGetter", () => {
    it("returns the country code from the country object", () => {
      const country = {
        country: "US",
        name: "United States",
        visits: 200,
        color: "#uuuuuu",
        formattedVisits: "200",
        icon: "",
      };
      expect(visitsMapCountryCodeGetter(country)).toBe("US");
    });
  });

  describe("visitsMapCountryColorGetter", () => {
    it("returns the color from the country object", () => {
      const country = {
        country: "US",
        name: "United States",
        visits: 200,
        color: "#uuuuuu",
        formattedVisits: "200",
        icon: "",
      };
      expect(visitsMapCountryColorGetter(country)).toBe("#uuuuuu");
    });
  });
});
