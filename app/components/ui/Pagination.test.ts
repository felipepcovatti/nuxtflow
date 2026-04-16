import { describe, it, expect, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent } from "@testing-library/vue";
import Pagination from "./Pagination.vue";

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the current items info", async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: {
        page: 2,
        total: 42,
        perPage: 10,
      },
    });

    expect(wrapper.text()).toContain("Showing 11-20 of 42");
  });

  it('indicates the active page number"', async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 3,
        total: 42,
        perPage: 10,
      },
    });

    const activePageButton = await wrapper.findByRole("button", {
      name: "Page 3",
    });

    expect(activePageButton.getAttribute("aria-current")).toBe("page");
  });

  it("emits update:page when clicking a page number", async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 1,
        total: 42,
        perPage: 10,
      },
    });

    const thirdPageButton = await wrapper.findByRole("button", {
      name: "Page 3",
    });
    await fireEvent.click(thirdPageButton);

    expect(wrapper.emitted("update:page").at(0)).toEqual([3]);
  });

  it("renders previous and next buttons", async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 2,
        total: 42,
        perPage: 10,
      },
    });
    const prevButton = await wrapper.findByRole("button", {
      name: "Previous page",
    });
    fireEvent.click(prevButton);
    expect(wrapper.emitted("update:page").at(0)).toEqual([1]);

    const nextButton = await wrapper.findByRole("button", {
      name: "Next page",
    });
    fireEvent.click(nextButton);
    expect(wrapper.emitted("update:page").at(1)).toEqual([2]);
  });

  it("emits update:page when clicking the next button", async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 1,
        total: 42,
        perPage: 10,
      },
    });

    const nextButton = await wrapper.findByRole("button", {
      name: "Next page",
    });
    await fireEvent.click(nextButton);

    expect(wrapper.emitted("update:page").at(0)).toEqual([2]);
  });

  it("disables previous navigation on the first page", async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 1,
        total: 42,
        perPage: 10,
      },
    });

    const prevButton = await wrapper.findByRole("button", {
      name: "Previous page",
    });

    fireEvent.click(prevButton);

    expect(wrapper.emitted("update:page")).toBeUndefined();
  });

  it("disables next navigation on the last page", async () => {
    const wrapper = await renderSuspended(Pagination, {
      props: {
        page: 5,
        total: 42,
        perPage: 10,
      },
    });

    const nextButton = await wrapper.findByRole("button", {
      name: "Next page",
    });

    fireEvent.click(nextButton);

    expect(wrapper.emitted("update:page")).toBeUndefined();
  });
});
