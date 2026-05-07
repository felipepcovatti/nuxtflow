import { describe, expect, it } from "vitest";
import { ref } from "vue";
import { useGrowthPercentage } from "./useGrowthPercentage";

describe("useGrowthPercentage", () => {
  it("returns a positive percentage with the up arrow and green color", () => {
    const { percentage, color, arrowIcon } = useGrowthPercentage(() => 12.34);

    expect(percentage.value).toBe("12.3%");
    expect(color.value).toBe("var(--color-green-500)");
    expect(arrowIcon.value).toBe("flowbite:arrow-up-outline");
  });

  it("returns an absolute percentage with the down arrow and red color for decreases", () => {
    const { percentage, color, arrowIcon } = useGrowthPercentage(() => -7.89);

    expect(percentage.value).toBe("7.9%");
    expect(color.value).toBe("var(--color-red-500)");
    expect(arrowIcon.value).toBe("flowbite:arrow-down-outline");
  });

  it("returns a zero percentage with no arrow and the neutral color", () => {
    const { percentage, color, arrowIcon } = useGrowthPercentage(() => 0);

    expect(percentage.value).toBe("0.0%");
    expect(color.value).toBe("var(--color-gray-400)");
    expect(arrowIcon.value).toBeNull();
  });

  it("returns a positive percentage with the up arrow and inverted color", () => {
    const { percentage, color, arrowIcon } = useGrowthPercentage(() => 5, {
      invertedSentiment: true,
    });

    expect(percentage.value).toBe("5.0%");
    expect(color.value).toBe("var(--color-red-500)");
    expect(arrowIcon.value).toBe("flowbite:arrow-up-outline");
  });

  it("updates the percentage, arrow, and color when the base value changes", () => {
    const value = ref(5);
    const { percentage, color, arrowIcon } = useGrowthPercentage(
      () => value.value,
    );

    expect(percentage.value).toBe("5.0%");
    expect(color.value).toBe("var(--color-green-500)");
    expect(arrowIcon.value).toBe("flowbite:arrow-up-outline");

    value.value = -3.25;

    expect(percentage.value).toBe("3.3%");
    expect(color.value).toBe("var(--color-red-500)");
    expect(arrowIcon.value).toBe("flowbite:arrow-down-outline");
  });
});
