import { describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import { useCheckboxGroup } from "./useCheckboxGroup";

describe("useCheckboxGroup", () => {
  it("returns an empty selection by default", () => {
    const items = ref([{ id: "item-1" }, { id: "item-2" }]);
    const { groupState, isSelected, selectedCount } = useCheckboxGroup(items);

    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
    expect(isSelected("item-1")).toBe(false);
  });

  it("toggles individual item selection", () => {
    const items = ref([{ id: "item-1" }, { id: "item-2" }]);
    const { groupState, isSelected, selectedCount, toggleSelection } =
      useCheckboxGroup(items);

    toggleSelection("item-1");

    expect(groupState.value).toBe("indeterminate");
    expect(selectedCount.value).toBe(1);
    expect(isSelected("item-1")).toBe(true);
    expect(isSelected("item-2")).toBe(false);

    toggleSelection("item-1");

    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
    expect(isSelected("item-1")).toBe(false);
  });

  it("selects and clears the whole group through groupState", () => {
    const items = ref([{ id: "item-1" }, { id: "item-2" }]);
    const { groupState, isSelected, selectedCount } = useCheckboxGroup(items);

    groupState.value = true;

    expect(groupState.value).toBe(true);
    expect(selectedCount.value).toBe(2);
    expect(isSelected("item-1")).toBe(true);
    expect(isSelected("item-2")).toBe(true);

    groupState.value = false;

    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
    expect(isSelected("item-1")).toBe(false);
    expect(isSelected("item-2")).toBe(false);
  });

  it("clears the selection when the item list changes", async () => {
    const items = ref([{ id: "item-1" }, { id: "item-2" }]);
    const { groupState, isSelected, selectedCount, toggleSelection } =
      useCheckboxGroup(items);

    toggleSelection("item-1");
    expect(groupState.value).toBe("indeterminate");
    expect(selectedCount.value).toBe(1);

    items.value = [{ id: "item-3" }];
    await nextTick();

    expect(groupState.value).toBe(false);
    expect(selectedCount.value).toBe(0);
    expect(isSelected("item-1")).toBe(false);
    expect(isSelected("item-3")).toBe(false);
  });
});
