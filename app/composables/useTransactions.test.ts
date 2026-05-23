import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { effectScope, nextTick, type EffectScope } from "vue";
import { useTransactions } from "./useTransactions";
import type { TransactionResponse } from "~/types/transactions";

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

describe("useTransactions", () => {
  let scope: EffectScope | null = null;

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    mockRefresh.mockReset();
    scope?.stop();
    scope = null;
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  function createComposable() {
    scope = effectScope();

    const composable = scope.run(() => useTransactions());

    if (!composable) {
      throw new Error("Failed to create useTransactions composable");
    }

    return composable;
  }

  it("returns the expected api data and state", () => {
    const { pageSize, page, transactions, total, pending } = createComposable();

    expect(pageSize).toBe(10);
    expect(page.value).toBe(1);
    expect(transactions.value).toHaveLength(10);
    expect(transactions.value.at(0)).toEqual({
      id: "transaction-1",
      description: "Payment from Acme Corp 1",
      amount: 1250,
      status: "completed",
      datetime: "2026-04-01T12:00:00.000Z",
    });
    expect(transactions.value.at(-1)).toEqual({
      id: "transaction-10",
      description: "Refund to Jane Doe 10",
      amount: 12500,
      status: "pending",
      datetime: "2026-04-10T12:00:00.000Z",
    });
    expect(total.value).toBe(11);
    expect(pending.value).toBe(false);
    expect(pageSize).toBe(10);
    expect(page.value).toBe(1);
    expect(transactions.value).toHaveLength(10);
    expect(transactions.value.at(0)).toEqual({
      id: "transaction-1",
      description: "Payment from Acme Corp 1",
      amount: 1250,
      status: "completed",
      datetime: "2026-04-01T12:00:00.000Z",
    });
    expect(transactions.value.at(-1)).toEqual({
      id: "transaction-10",
      description: "Refund to Jane Doe 10",
      amount: 12500,
      status: "pending",
      datetime: "2026-04-10T12:00:00.000Z",
    });
    expect(total.value).toBe(11);
    expect(pending.value).toBe(false);
  });

  it("refreshes immediately when the page changes", async () => {
    const { page } = createComposable();

    page.value = 2;
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("refreshes immediately when the status filter changes and after it is cleared", async () => {
    const { page, status } = createComposable();

    page.value = 2;
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(1);

    status.value = "pending";
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(2);

    status.value = null;
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(3);
  });

  it("refreshes with debounce when the search term changes and after it is cleared", async () => {
    const { searchTerm } = createComposable();
    searchTerm.value = "Acme";
    await nextTick();
    expect(mockRefresh).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(mockRefresh).toHaveBeenCalledTimes(1);

    searchTerm.value = "";
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(2);
  });

  it("resets to the first page when the search term changes, without duplicating refresh calls", async () => {
    const { page, searchTerm } = createComposable();

    page.value = 2;
    await nextTick();

    searchTerm.value = "Acme";
    await nextTick();
    expect(page.value).toBe(2);
    expect(mockRefresh).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(page.value).toBe(1);
    expect(mockRefresh).toHaveBeenCalledTimes(2);
  });

  it("resets to the first page when status filter changes, without duplicating refresh calls", async () => {
    const { page, status } = createComposable();

    page.value = 2;
    await nextTick();
    expect(mockRefresh).toHaveBeenCalledTimes(1);

    status.value = "completed";
    await nextTick();
    expect(page.value).toBe(1);
  });

  it("selects and deselects transactions using returned methods", () => {
    const { isSelected, toggleSelection, selectedCount } = createComposable();

    expect(selectedCount.value).toBe(0);
    expect(isSelected("transaction-1")).toBe(false);

    toggleSelection("transaction-1");
    expect(isSelected("transaction-1")).toBe(true);
    expect(selectedCount.value).toBe(1);

    toggleSelection("transaction-1");
    expect(isSelected("transaction-1")).toBe(false);
    expect(selectedCount.value).toBe(0);
  });

  it("clears all selections immediately after changing the page", async () => {
    const { page, isSelected, toggleSelection, groupState, selectedCount } =
      createComposable();

    toggleSelection("transaction-1");
    expect(isSelected("transaction-1")).toBe(true);
    expect(groupState.value).toBe("indeterminate");
    expect(selectedCount.value).toBe(1);

    page.value = 2;
    await nextTick();
    expect(isSelected("transaction-1")).toBe(false);
    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
  });

  it("clears all selections immediately after changing the status filter", async () => {
    const { status, isSelected, toggleSelection, groupState, selectedCount } =
      createComposable();

    toggleSelection("transaction-2");
    expect(isSelected("transaction-2")).toBe(true);
    expect(selectedCount.value).toBe(1);

    status.value = "completed";
    await nextTick();
    expect(isSelected("transaction-2")).toBe(false);
    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
  });

  it("correctly gets and sets the checkbox group state", () => {
    const { groupState, isSelected, toggleSelection, selectedCount } =
      createComposable();

    expect(groupState.value).toBe(false);

    toggleSelection("transaction-1");
    expect(isSelected("transaction-1")).toBe(true);
    expect(groupState.value).toBe("indeterminate");

    groupState.value = true;
    expect(selectedCount.value).toBe(10);
    expect(isSelected("transaction-1")).toBe(true);
    expect(isSelected("transaction-10")).toBe(true);

    toggleSelection("transaction-1");
    expect(groupState.value).toBe("indeterminate");

    groupState.value = false;
    expect(selectedCount.value).toBe(0);
    expect(isSelected("transaction-1")).toBe(false);
    expect(isSelected("transaction-10")).toBe(false);
  });
});
