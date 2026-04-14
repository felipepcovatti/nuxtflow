import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Checkbox from "./Checkbox.vue";

describe("Checkbox", () => {
  it("renders unchecked by default", async () => {
    const wrapper = await mountSuspended(Checkbox);

    expect(wrapper.find("[role=checkbox]").attributes("aria-checked")).toBe(
      "false",
    );
    expect(wrapper.findComponent({ name: "NuxtIcon" }).exists()).toBe(false);
  });

  it("renders checked when modelValue is true", async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: { modelValue: true },
    });

    expect(wrapper.find("[role=checkbox]").attributes("aria-checked")).toBe(
      "true",
    );
    expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
      "radix-icons:check",
    );
  });

  it("renders indeterminate when modelValue is indeterminate", async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: { modelValue: "indeterminate" },
    });

    expect(wrapper.find("[role=checkbox]").attributes("aria-checked")).toBe(
      "mixed",
    );
    expect(wrapper.findComponent({ name: "NuxtIcon" }).props("name")).toBe(
      "radix-icons:divider-horizontal",
    );
  });

  it("emits update:modelValue when clicked", async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: { modelValue: "indeterminate" },
    });

    const checkbox = wrapper.find("[role=checkbox]");

    await checkbox.trigger("click");

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual([true]);

    await checkbox.trigger("click");

    expect(wrapper.emitted("update:modelValue")?.at(1)).toEqual([false]);
  });
});
