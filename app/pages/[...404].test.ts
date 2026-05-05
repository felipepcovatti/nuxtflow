import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NotFoundPage from "./[...404].vue";

const { mockedGoBack } = vi.hoisted(() => ({
  mockedGoBack: vi.fn(),
}));

mockNuxtImport("useHistory", () => {
  return () => ({
    goBack: mockedGoBack,
  });
});

const ROUTE_PATH = "/missing-page";

function mountPage() {
  return mountSuspended(NotFoundPage, {
    route: ROUTE_PATH,
  });
}

describe("pages/[...404]", () => {
  beforeEach(() => {
    mockedGoBack.mockReset();
  });

  it("renders the missing route and translated text", async () => {
    const wrapper = await mountPage();
    const card = wrapper.getComponent({ name: "UiCard" });

    expect(card.props("title")).toBe(ROUTE_PATH);
    expect(card.props("subtitle")).toBe("Not implemented");
    expect(wrapper.text()).toContain(
      "Only the Overview page is currently available.",
    );
    expect(wrapper.get("button").text()).toContain("Go back");
  });

  it("goes back when the user clicks the button", async () => {
    const wrapper = await mountPage();

    await wrapper.get("button").trigger("click");

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
});
