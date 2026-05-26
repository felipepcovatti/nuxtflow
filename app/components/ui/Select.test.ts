import { describe, it, expect, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent } from "@testing-library/vue";
import Select from "./Select.vue";
import type { SelectOption } from "./Select.vue";

const options: SelectOption[] = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

describe("Select", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the selected option label in the trigger", async () => {
    const wrapper = await mountSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
        triggerAriaLabel: "Select status",
      },
    });

    expect(wrapper.get("button").text()).toContain("Pending");
  });

  it("renders all options when opened", async () => {
    const wrapper = await renderSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
        triggerAriaLabel: "Select status",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });
    const statusOptions = await wrapper.findAllByRole("option");
    expect(statusOptions).toHaveLength(options.length);
    expect(statusOptions.at(0)?.textContent).toBe("All statuses");
    expect(statusOptions.at(1)?.textContent).toBe("Pending");
    expect(statusOptions.at(2)?.textContent).toBe("Completed");
  });

  it("marks the current option as selected when opened", async () => {
    const wrapper = await renderSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
        triggerAriaLabel: "Select status",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const pendingOption = await wrapper.findByRole("option", {
      name: "Pending",
    });

    expect(pendingOption.getAttribute("aria-selected")).toBe("true");
  });

  it("renders custom selected slot content", async () => {
    const wrapper = await mountSuspended(Select, {
      props: {
        modelValue: "completed",
        options,
        triggerAriaLabel: "Select status",
      },
      slots: {
        default: ({ selected }: { selected: SelectOption<string> }) =>
          `Status: ${selected.label}`,
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toBe("Status: Completed");
  });

  it('emits "update:modelValue" with the correct value when an option is selected', async () => {
    const wrapper = await renderSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
        triggerAriaLabel: "Select status",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const optionToSelect = await wrapper.findByRole("option", {
      name: "Completed",
    });

    await fireEvent.keyDown(optionToSelect, { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["completed"]);
  });
});
