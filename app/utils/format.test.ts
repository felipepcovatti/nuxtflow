import { describe, it, expect } from "vitest";

describe("formattedDollars", () => {
  it("formats positive numbers correctly", () => {
    const result = formattedDollars(1234.56);
    expect(result).toBe("$1,234.56");
  });

  it("formats zero correctly", () => {
    const result = formattedDollars(0);
    expect(result).toBe("$0.00");
  });

  it("formats negative numbers correctly", () => {
    const result = formattedDollars(-500);
    expect(result).toBe("-$500.00");
  });

  it("rounds to two decimal places", () => {
    const result = formattedDollars(1.005);
    expect(result).toBe("$1.01");
  });
});
