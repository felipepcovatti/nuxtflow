import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import DateRangePicker from "./DateRangePicker.vue";
import { cleanup, fireEvent } from "@testing-library/vue";

describe("DateRangePicker", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-04-14T12:00:00.000Z"));
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the trigger with formatted dates", async () => {
    const wrapper = await mountSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2026-01-01T00:00:00.000Z",
          end: "2026-01-31T23:59:59.999Z",
        },
      },
    });
    expect(wrapper.find("button").text()).toContain("Jan 1-Jan 31");
  });

  it("toggles aria-expanded on trigger click", async () => {
    const wrapper = await mountSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2026-01-01T00:00:00.000Z",
          end: "2026-01-31T23:59:59.999Z",
        },
      },
    });
    const triggerButton = wrapper.find("button");
    expect(triggerButton.attributes("aria-expanded")).toBe("false");

    await triggerButton.trigger("click");
    expect(triggerButton.attributes("aria-expanded")).toBe("true");

    await triggerButton.trigger("click");
    expect(triggerButton.attributes("aria-expanded")).toBe("false");
  });

  it("emits update:modelValue with correct dates when selecting 7D preset", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2023-01-01T00:00:00.000Z",
          end: "2023-01-31T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const presetOption = await wrapper.findByText("Last 7 days");
    await fireEvent.click(presetOption);

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual([
      {
        start: "2026-04-08T00:00:00.000Z",
        end: "2026-04-14T23:59:59.999Z",
      },
    ]);
    expect(wrapper.emitted("selected")).toHaveLength(2);
  });

  it("emits update:modelValue with correct dates when selecting 30D preset", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2023-01-01T00:00:00.000Z",
          end: "2023-01-31T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const presetOption = await wrapper.findByText("Last 30 days");
    await fireEvent.click(presetOption);

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual([
      {
        start: "2026-03-16T00:00:00.000Z",
        end: "2026-04-14T23:59:59.999Z",
      },
    ]);
  });

  it("emits update:modelValue with correct dates when selecting 90D preset", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2023-01-01T00:00:00.000Z",
          end: "2023-01-31T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const presetOption = await wrapper.findByText("Last 90 days");
    await fireEvent.click(presetOption);

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual([
      {
        start: "2026-01-15T00:00:00.000Z",
        end: "2026-04-14T23:59:59.999Z",
      },
    ]);
  });

  it("emits update:modelValue with correct dates when selecting 1Y preset", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2023-01-01T00:00:00.000Z",
          end: "2023-01-31T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const presetOption = await wrapper.findByText("Last 1 year");
    await fireEvent.click(presetOption);

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual([
      {
        start: "2025-04-15T00:00:00.000Z",
        end: "2026-04-14T23:59:59.999Z",
      },
    ]);
  });

  it("emits update:modelValue with correct dates when selecting a custom range", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2026-04-07T00:00:00.000Z",
          end: "2026-04-14T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const startDayButton = await wrapper.findByRole("button", {
      name: "Wednesday, April 8, 2026",
    });
    await fireEvent.click(startDayButton);

    const endDayButton = await wrapper.findByRole("button", {
      name: "Friday, April 10, 2026",
    });
    await fireEvent.click(endDayButton);

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([
      {
        start: "2026-04-08T00:00:00.000Z",
        end: "2026-04-10T23:59:59.999Z",
      },
    ]);
    expect(wrapper.emitted("selected")).toHaveLength(1);
  });

  it("auto-completes end date with today when closed after selecting only a start date", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2026-04-07T00:00:00.000Z",
          end: "2026-04-15T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const startDayButton = await wrapper.findByRole("button", {
      name: "Wednesday, April 8, 2026",
    });
    await fireEvent.click(startDayButton);

    await fireEvent.click(triggerButton);

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([
      {
        start: "2026-04-08T00:00:00.000Z",
        end: "2026-04-14T23:59:59.999Z",
      },
    ]);
  });

  it("marks 7D as active when modelValue matches last 7 days ending today", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        modelValue: {
          start: "2026-04-08T00:00:00.000Z",
          end: "2026-04-14T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const presetOption = await wrapper.findByText("Last 7 days");
    expect(presetOption.getAttribute("aria-selected")).toBe("true");
  });

  it("does not allow selecting a future date when disableFuture is true", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        disableFuture: true,
        modelValue: {
          start: "2026-04-08T00:00:00.000Z",
          end: "2026-04-14T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const futureDay = await wrapper.findByLabelText(
      "Wednesday, April 15, 2026",
    );

    expect(futureDay.getAttribute("aria-disabled")).toBe("true");

    await fireEvent.click(futureDay);
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("does not allow selecting a date before the minStart boundary", async () => {
    const wrapper = await renderSuspended(DateRangePicker, {
      props: {
        minStart: "one-year-ago",
        modelValue: {
          start: "2025-04-15T00:00:00.000Z",
          end: "2025-04-19T23:59:59.999Z",
        },
      },
    });

    const triggerButton = await wrapper.findByRole("button");
    await fireEvent.click(triggerButton);

    const outOfRangeDay = await wrapper.findByLabelText(
      "Monday, April 14, 2025",
    );

    expect(outOfRangeDay.getAttribute("aria-disabled")).toBe("true");

    await fireEvent.click(outOfRangeDay);
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });
});
