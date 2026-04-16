import { describe, it, expect, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent, screen } from "@testing-library/vue";
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
      },
    });

    expect(wrapper.get("button").text()).toContain("Pending");
  });

  it("renders all options when opened", async () => {
    const wrapper = await renderSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });
    const optionElements = await wrapper.findAllByRole("option");
    expect(optionElements).toHaveLength(options.length);
    expect(optionElements[0]?.textContent).toBe("All statuses");
    expect(optionElements[1]?.textContent).toBe("Pending");
    expect(optionElements[2]?.textContent).toBe("Completed");
  });

  it("marks the current option as selected when opened", async () => {
    const wrapper = await renderSuspended(Select, {
      props: {
        modelValue: "pending",
        options,
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
      },
      slots: {
        default: ({ selected }: { selected: SelectOption<string> }) =>
          `Status: ${selected.label}`,
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toBe("Status: Completed");
  });
});
