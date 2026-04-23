import { afterEach, describe, expect, it } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent } from "@testing-library/vue";
import TransactionStatusSelect from "./TransactionStatusSelect.vue";

describe("TransactionStatusSelect", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a labeled, bordered UiSelect with status options", async () => {
    const wrapper = await mountSuspended(TransactionStatusSelect, {
      props: {
        modelValue: null,
      },
    });

    const select = wrapper.getComponent({ name: "UiSelect" });

    expect(select.props("bordered")).toBe(true);
    expect(select.props("triggerAriaLabel")).toBe("Filter by status");
    expect(select.props("options")).toEqual([
      { value: "all", label: "All statuses" },
      { value: "completed", label: "Complete" },
      { value: "in_progress", label: "In progress" },
      { value: "pending", label: "Pending" },
      { value: "cancelled", label: "Cancelled" },
    ]);
  });

  it("renders the all statuses label when no status is selected", async () => {
    const wrapper = await mountSuspended(TransactionStatusSelect, {
      props: {
        modelValue: null,
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toContain("All statuses");
    expect(wrapper.get('[role="combobox"]').text()).not.toContain("Status:");
  });

  it("renders the selected status in the trigger", async () => {
    const wrapper = await mountSuspended(TransactionStatusSelect, {
      props: {
        modelValue: "completed",
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toContain(
      "Status: Complete",
    );
  });

  it('emits null when selecting the "all" option', async () => {
    const wrapper = await renderSuspended(TransactionStatusSelect, {
      props: {
        modelValue: "completed",
      },
    });

    const trigger = await wrapper.findByRole("combobox", {
      name: "Filter by status",
    });
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const optionToSelect = await wrapper.findByRole("option", {
      name: "All statuses",
    });

    await fireEvent.keyDown(optionToSelect, { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue").at(0)).toEqual([null]);
  });

  it("emits the selected status value", async () => {
    const wrapper = await renderSuspended(TransactionStatusSelect, {
      props: {
        modelValue: null,
      },
    });

    const trigger = await wrapper.findByRole("combobox", {
      name: "Filter by status",
    });
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const optionToSelect = await wrapper.findByRole("option", {
      name: "In progress",
    });

    await fireEvent.keyDown(optionToSelect, { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue").at(0)).toEqual(["in_progress"]);
  });
});
