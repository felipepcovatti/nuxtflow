import { describe, it, expect, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent } from "@testing-library/vue";
import PeriodSelect from "./PeriodSelect.vue";

describe("PeriodSelect", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the selected period label", async () => {
    const wrapper = await mountSuspended(PeriodSelect, {
      props: {
        modelValue: "7D",
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toContain("Last 7 days");
  });

  it("renders all translated period options when opened", async () => {
    const wrapper = await renderSuspended(PeriodSelect, {
      props: {
        modelValue: "7D",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const optionElements = await wrapper.findAllByRole("option");

    expect(optionElements).toHaveLength(4);
    expect(optionElements[0]?.textContent).toBe("Last 7 days");
    expect(optionElements[1]?.textContent).toBe("Last 30 days");
    expect(optionElements[2]?.textContent).toBe("Last 90 days");
    expect(optionElements[3]?.textContent).toBe("Last 1 year");
  });

  it("marks the current period as selected when opened", async () => {
    const wrapper = await renderSuspended(PeriodSelect, {
      props: {
        modelValue: "90D",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const selectedOption = await wrapper.findByRole("option", {
      name: "Last 90 days",
    });

    expect(selectedOption.getAttribute("aria-selected")).toBe("true");
  });

  it("updates the modelValue when selecting a different period", async () => {
    const wrapper = await renderSuspended(PeriodSelect, {
      props: {
        modelValue: "30D",
      },
    });

    const trigger = await wrapper.findByRole("combobox");
    await fireEvent.keyDown(trigger, { key: "Enter" });

    const newOption = await wrapper.findByRole("option", {
      name: "Last 1 year",
    });
    await fireEvent.keyDown(newOption, { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1Y"]);
  });
});
