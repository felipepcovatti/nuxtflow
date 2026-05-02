import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Router } from "vue-router";
import { useHistory } from "./useHistory";

const { mockedBack, mockedNavigateTo } = vi.hoisted(() => ({
  mockedBack: vi.fn(),
  mockedNavigateTo: vi.fn(),
}));

mockNuxtImport<() => Router>("useRouter", (actual) => {
  return () => ({
    ...actual(),
    back: mockedBack,
  });
});

mockNuxtImport("navigateTo", () => mockedNavigateTo);

describe("useHistory", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
    mockedBack.mockClear();
    mockedNavigateTo.mockClear();
  });

  it("goes to the home page when there is no history", () => {
    const { goBack } = useHistory();

    goBack();

    expect(mockedBack).not.toHaveBeenCalled();
    expect(mockedNavigateTo).toHaveBeenCalledWith("/");
  });

  it("goes back to the previous page when there is history", () => {
    const { goBack } = useHistory();

    window.history.replaceState({ back: "/previous" }, "", "/current");

    goBack();

    expect(mockedBack).toHaveBeenCalled();
    expect(mockedNavigateTo).not.toHaveBeenCalled();
  });
});
