import { breakpointsTailwind } from "@vueuse/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIsExtraSmall } from "./useIsExtraSmall";

const { isExtraSmallState, mockedSmaller, mockedUseBreakpoints } = vi.hoisted(
  () => {
    const mockedSmaller = vi.fn();
    const mockedUseBreakpoints = vi.fn(() => ({
      smaller: mockedSmaller,
    }));

    return {
      isExtraSmallState: {
        value: false,
      },
      mockedSmaller,
      mockedUseBreakpoints,
    };
  },
);

vi.mock("@vueuse/core", async () => {
  const actual = await vi.importActual("@vueuse/core");

  return {
    ...actual,
    useBreakpoints: mockedUseBreakpoints,
  };
});

describe("useIsExtraSmall", () => {
  beforeEach(() => {
    isExtraSmallState.value = false;
    mockedSmaller.mockReset();
    mockedSmaller.mockReturnValue(isExtraSmallState);
    mockedUseBreakpoints.mockClear();
  });

  it('returns true when the viewport is smaller than "sm"', () => {
    isExtraSmallState.value = true;

    const { isExtraSmall } = useIsExtraSmall();

    expect(mockedUseBreakpoints).toHaveBeenCalledWith(breakpointsTailwind);
    expect(mockedSmaller).toHaveBeenCalledWith("sm");
    expect(isExtraSmall.value).toBe(true);
  });

  it('returns false when the viewport is not smaller than "sm"', () => {
    const { isExtraSmall } = useIsExtraSmall();

    expect(mockedSmaller).toHaveBeenCalledWith("sm");
    expect(isExtraSmall.value).toBe(false);
  });
});
