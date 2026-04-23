import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  mountSuspended,
  mockNuxtImport,
  renderSuspended,
} from "@nuxt/test-utils/runtime";
import Transactions from "./Transactions.vue";
import type { TransactionResponse } from "~/types/transactions";
import { fireEvent } from "@testing-library/vue";

const { mockRefresh } = vi.hoisted(() => ({
  mockRefresh: vi.fn(),
}));

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref<TransactionResponse>({
      data: Array.from({ length: 10 }, (_, index) => ({
        id: `transaction-${index + 1}`,
        description:
          index % 2 === 0
            ? `Payment from Acme Corp ${index + 1}`
            : `Refund to Jane Doe ${index + 1}`,
        amount: (index + 1) * 1250,
        status: index % 2 === 0 ? "completed" : "pending",
        datetime: `2026-04-${String(index + 1).padStart(2, "0")}T12:00:00.000Z`,
      })),
      meta: {
        total: 11,
        page: 1,
        page_size: 10,
        locale: "en-US",
      },
    }),
    refresh: mockRefresh,
    pending: ref(false),
  });
});

describe("Transactions", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    mockRefresh.mockReset();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("renders the transactions table with formatted values and pagination", async () => {
    const wrapper = await mountSuspended(Transactions);

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(10);

    const firstRow = rows.at(0)?.text();
    expect(firstRow).toContain("Payment from Acme Corp 1");
    expect(firstRow).toContain("Apr 1, 2026");
    expect(firstRow).toContain("$1,250");
    expect(firstRow).toContain("Complete");

    const lastRow = rows.at(-1)?.text();
    expect(lastRow).toContain("Refund to Jane Doe 10");
    expect(lastRow).toContain("Apr 10, 2026");
    expect(lastRow).toContain("$12,500");
    expect(lastRow).toContain("Pending");

    const pagination = wrapper.findComponent({ name: "UiPagination" });
    expect(pagination.props("total")).toBe(11);
    expect(pagination.props("perPage")).toBe(10);
    expect(pagination.props("page")).toBe(1);
  });

  it("refreshes with debounce when the search term changes", async () => {
    const wrapper = await renderSuspended(Transactions);

    const searchInput = wrapper.getByPlaceholderText(
      "Search by transaction description",
    );

    await fireEvent.update(searchInput, "payment");

    expect(mockRefresh).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(200);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("refreshes when changing the status filter", async () => {
    const wrapper = await mountSuspended(Transactions);

    const statusFilter = wrapper.getComponent({
      name: "OverviewTransactionStatusSelect",
    });

    expect(mockRefresh).not.toHaveBeenCalled();

    await statusFilter.vm.$emit("update:modelValue", "completed");

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("resets to the first page when the status filter changes", async () => {
    const wrapper = await mountSuspended(Transactions);
    const pagination = wrapper.getComponent({ name: "UiPagination" });

    await pagination.vm.$emit("update:page", 2);

    expect(mockRefresh).toHaveBeenCalledTimes(1);

    const statusFilter = wrapper.getComponent({
      name: "OverviewTransactionStatusSelect",
    });

    await statusFilter.vm.$emit("update:modelValue", "completed");

    expect(pagination.props("page")).toBe(1);
    expect(mockRefresh).toHaveBeenCalledTimes(2);
  });

  it("enables the download receipts button when there are selected transactions", async () => {
    const wrapper = await renderSuspended(Transactions);
    const downloadButton = wrapper.getByRole("button", {
      name: "Download receipts",
    });

    expect(downloadButton.getAttribute("disabled")).toBe("");

    const firstRowCheckbox = wrapper.getByRole("checkbox", {
      name: 'Select transaction "Payment from Acme Corp 1"',
    });

    await fireEvent.click(firstRowCheckbox);

    expect(downloadButton.getAttribute("disabled")).toBeNull();

    expect(downloadButton.textContent).toBe("Download receipt");

    const secondRowCheckbox = wrapper.getByRole("checkbox", {
      name: 'Select transaction "Refund to Jane Doe 2"',
    });

    await fireEvent.click(secondRowCheckbox);

    expect(downloadButton.getAttribute("disabled")).toBeNull();

    expect(downloadButton.textContent).toBe("Download receipts (2)");
  });

  it("selects all transactions in the current page when clicking the select all checkbox", async () => {
    const wrapper = await mountSuspended(Transactions);
    const checkboxes = wrapper.findAllComponents({ name: "UiCheckbox" });

    expect(checkboxes).toHaveLength(11);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });

    const selectAllCheckbox = wrapper
      .get("th")
      .getComponent({ name: "UiCheckbox" });

    await selectAllCheckbox.vm.$emit("update:modelValue", true);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.attributes("aria-checked")).toBe("true");
    });
  });

  it("unselects transactions when the search or status filter changes", async () => {
    const wrapper = await mountSuspended(Transactions);

    const selectAllCheckbox = wrapper
      .get("th")
      .getComponent({ name: "UiCheckbox" });

    await selectAllCheckbox.vm.$emit("update:modelValue", true);

    const checkboxes = wrapper.findAll(
      '[role="checkbox"][aria-checked="true"]',
    );

    expect(checkboxes).toHaveLength(11);

    const searchBox = wrapper.getComponent({ name: "UiSearchBox" });

    await searchBox.vm.$emit("update:modelValue", "payment");

    await vi.advanceTimersByTimeAsync(200);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });

    await selectAllCheckbox.vm.$emit("update:modelValue", true);

    const statusFilter = wrapper.getComponent({
      name: "OverviewTransactionStatusSelect",
    });

    await statusFilter.vm.$emit("update:modelValue", "completed");

    checkboxes.forEach((checkbox) => {
      expect(checkbox.attributes("aria-checked")).toBe("false");
    });
  });

  it("unselects transactions when page changes", async () => {
    const wrapper = await renderSuspended(Transactions);

    const selectAllCheckbox = await wrapper.findByRole("checkbox", {
      name: "Select the 10 transactions in current page",
    });

    await fireEvent.click(selectAllCheckbox);

    const nextPageButton = wrapper.getByRole("button", { name: "Next page" });

    await fireEvent.click(nextPageButton);

    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
  });
});
