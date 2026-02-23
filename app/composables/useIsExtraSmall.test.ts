import { describe, it, expect, vi } from "vitest";
import { useIsExtraSmall } from "./useIsExtraSmall"; // Adjust path accordingly

const mockSmaller = vi.fn();

vi.mock("@vueuse/core", async () => {
  const actual = await vi.importActual("@vueuse/core");
  return {
    ...actual,
    useBreakpoints: () => ({
      smaller: mockSmaller,
    }),
  };
});

describe("useIsExtraSmall", () => {
  it('should return true when the screen is smaller than "sm"', () => {
    mockSmaller.mockReturnValue(ref(true));

    const { isExtraSmall } = useIsExtraSmall();

    expect(mockSmaller).toHaveBeenCalledWith("sm");
    expect(isExtraSmall.value).toBe(true);
  });

  it('should return false when the screen is not smaller than "sm"', () => {
    mockSmaller.mockReturnValue(ref(false));

    const { isExtraSmall } = useIsExtraSmall();

    expect(isExtraSmall.value).toBe(false);
  });
});
