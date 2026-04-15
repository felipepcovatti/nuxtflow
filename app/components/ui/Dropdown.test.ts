import { describe, it, expect, vi, afterEach } from "vitest";
import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { cleanup, fireEvent } from "@testing-library/vue";
import Dropdown from "./Dropdown.vue";

describe("Dropdown", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the default trigger when no slot is provided", async () => {
    const wrapper = await mountSuspended(Dropdown, {
      props: { items: [] },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.findComponent({ name: "NuxtIcon" }).exists()).toBe(true);
  });

  it("renders custom trigger content from the default slot", async () => {
    const wrapper = await mountSuspended(Dropdown, {
      props: { items: [] },
      slots: {
        default: "<button>Custom Trigger</button>",
      },
    });

    expect(wrapper.findAll("button").length).toBe(1);
    expect(wrapper.find("button").text()).toBe("Custom Trigger");
  });

  it("renders all dropdown items when opened", async () => {
    const wrapper = await renderSuspended(Dropdown, {
      props: {
        items: [
          { label: "Edit", icon: "mdi:pencil", action: vi.fn() },
          { label: "Delete", icon: "mdi:delete", action: vi.fn() },
        ],
      },
    });

    const trigger = await wrapper.findByRole("button");
    await fireEvent.click(trigger);

    expect(await wrapper.findByText("Edit")).toBeTruthy();
    expect(await wrapper.findByText("Delete")).toBeTruthy();
  });

  it("calls item action when selecting a dropdown item", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    const wrapper = await renderSuspended(Dropdown, {
      props: {
        items: [
          { label: "Edit", icon: "mdi:pencil", action: onEdit },
          { label: "Delete", icon: "mdi:delete", action: onDelete },
        ],
      },
    });

    const trigger = await wrapper.findByRole("button");
    await fireEvent.click(trigger);

    const editItem = await wrapper.findByText("Edit");
    await fireEvent.click(editItem);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("closes the dropdown when pressing Escape", async () => {
    const wrapper = await renderSuspended(Dropdown, {
      props: {
        items: [
          { label: "Edit", icon: "mdi:pencil", action: vi.fn() },
          { label: "Delete", icon: "mdi:delete", action: vi.fn() },
        ],
      },
    });

    const trigger = await wrapper.findByRole("button");
    await fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    await fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
