import { describe, expect, it, vi } from "vitest";
import { ref, type Ref } from "vue";
import type { ChartItem, ChartType } from "~/types/chart";
import { useChart, type UseChartOptions } from "./useChart";

vi.mock("@unovis/ts", () => ({
  Area: {
    selectors: {
      area: "stacked-area",
    },
  },
  GroupedBar: {
    selectors: {
      bar: "grouped-bar",
      barGroup: "grouped-bar-group",
    },
  },
  StackedBar: {
    selectors: {
      bar: "stacked-bar",
      barGroup: "stacked-bar-group",
    },
  },
}));

const chartItems: ChartItem<"sales" | "returns">[] = [
  { id: "sales", color: "#2563eb", label: "Sales" },
  { id: "returns", color: "#dc2626", label: "Returns" },
] as const;

const firstRecord = { month: "January", sales: 10, returns: 20 };
const secondRecord = { month: "February", sales: 15, returns: 25 };

const GROUPED_BAR = "grouped-bar";
const GROUPED_BAR_GROUP = "grouped-bar-group";
const STACKED_BAR_GROUP = "stacked-bar-group";
const STACKED_AREA = "stacked-area";

function getUseChart(options: Partial<UseChartOptions> = {}) {
  return useChart({
    wrapperRef: ref(document.createElement("div")),
    items: chartItems,
    getGroupRecords: () => [firstRecord, secondRecord],
    getType: () => "grouped-bar",
    tooltipTitleGetter: (record) => record.month,
    itemYGetter: (record, itemId) => record[itemId],
    ...options,
  });
}

function generateIsMutedChecker(wrapper: HTMLDivElement) {
  return (selector: string) =>
    Array.from(wrapper.querySelectorAll(selector)).every((element) =>
      element.classList.contains("muted"),
    );
}

describe("useChart", () => {
  it("returns grouped bar attributes and tooltip triggers", () => {
    const { barAttributes, tooltipTriggers } = getUseChart({
      groupXGetter: (record) => record.month,
    });

    const barDataItemId = barAttributes.value[GROUPED_BAR]?.["data-item-id"];
    const barGroupX = barAttributes.value[GROUPED_BAR_GROUP]?.["data-group-x"];
    const barGroupTooltip = tooltipTriggers.value[GROUPED_BAR_GROUP];

    if (!barDataItemId || !barGroupX || !barGroupTooltip) {
      throw new Error("Expected grouped bar helpers to be defined");
    }

    expect(barDataItemId(firstRecord, 0)).toBe("sales");
    expect(barDataItemId(firstRecord, 1)).toBe("returns");
    expect(barGroupX(firstRecord, 1)).toBe(1);

    const tooltip = barGroupTooltip(firstRecord);
    expect(tooltip.textContent).toContain("January");
    expect(tooltip.textContent).toContain("Sales:10");
    expect(tooltip.textContent).toContain("Returns:20");
  });

  it("returns area attributes and no bar-specific helpers for stacked-area charts", () => {
    const { areaAttributes, barAttributes, barEvents, tooltipTriggers } =
      getUseChart({
        getType: () => "stacked-area",
      });

    expect(barAttributes.value).toEqual({});
    expect(barEvents.value).toEqual({});
    expect(tooltipTriggers.value).toEqual({});
    const areaDataItemId = areaAttributes[STACKED_AREA]?.["data-item-id"];

    if (!areaDataItemId) {
      throw new Error("Expected stacked-area attributes to be defined");
    }

    expect(areaDataItemId(firstRecord, 0)).toBe("sales");
    expect(areaDataItemId(secondRecord, 1)).toBe("returns");
  });

  it("formats x-axis ticks and returns item colors and y getters", () => {
    const { colorGetter, getGroupX, itemYGetters } = getUseChart({
      groupXGetter: (record) => record.month,
    });
    expect(getGroupX(0)).toBe("January");
    expect(getGroupX(1.5)).toBe("");
    expect(getGroupX(1)).toBe("February");
    expect(getGroupX(10)).toBe(10);
    expect(colorGetter(firstRecord, 0)).toBe("#2563eb");
    expect(colorGetter(secondRecord, 1)).toBe("#dc2626");

    const salesYGetter = itemYGetters.value.at(0);
    const returnsYGetter = itemYGetters.value.at(1);

    if (!salesYGetter || !returnsYGetter) {
      throw new Error("Expected item y getters to be defined");
    }
    expect(salesYGetter(firstRecord)).toBe(10);
    expect(salesYGetter(secondRecord)).toBe(15);
    expect(returnsYGetter(firstRecord)).toBe(20);
    expect(returnsYGetter(secondRecord)).toBe(25);
  });

  it("returns the raw x-axis value when groupXGetter is not provided", () => {
    const { getGroupX } = getUseChart();

    expect(getGroupX(0)).toBe(0);
    expect(getGroupX(1)).toBe(1);
  });

  it("reverses tooltip item order for stacked bars", () => {
    const { renderTooltip } = getUseChart({
      getType: () => "stacked-bar",
    });

    const tooltip = renderTooltip(firstRecord);
    expect(tooltip.textContent).toContain("January");
    const returnsIndex = tooltip.textContent?.indexOf("Returns:");
    const salesIndex = tooltip.textContent?.indexOf("Sales:");
    expect(salesIndex).toBeGreaterThan(-1);
    expect(returnsIndex).toBeGreaterThan(-1);
    expect(returnsIndex).toBeLessThan(salesIndex);
  });

  it("keeps tooltip item order for horizontal stacked bars", () => {
    const { renderTooltip } = getUseChart({
      getType: () => "horizontal-stacked-bar",
    });

    const tooltip = renderTooltip(firstRecord);
    expect(tooltip.textContent).toContain("January");
    const salesIndex = tooltip.textContent?.indexOf("Sales:");
    const returnsIndex = tooltip.textContent?.indexOf("Returns:");
    expect(salesIndex).toBeGreaterThan(-1);
    expect(returnsIndex).toBeGreaterThan(-1);
    expect(salesIndex).toBeLessThan(returnsIndex);
  });

  it("mutes matching groups and items for grouped bars", () => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div data-group-x="0">
        <div data-item-id="sales"></div>
        <div data-item-id="returns"></div>
      </div>
      <div data-group-x="1">
        <div data-item-id="sales"></div>
        <div data-item-id="returns"></div>
      </div>
    `;
    const { barEvents, muteOtherItems, unmuteAll } = getUseChart({
      wrapperRef: ref(wrapper),
    });

    const isMuted = generateIsMutedChecker(wrapper);

    muteOtherItems("sales");

    expect(isMuted('[data-item-id="sales"]')).toBe(false);
    expect(isMuted('[data-item-id="returns"]')).toBe(true);

    unmuteAll();

    expect(isMuted('[data-item-id="sales"]')).toBe(false);
    expect(isMuted('[data-item-id="returns"]')).toBe(false);

    const groupedBarEvents = barEvents.value[GROUPED_BAR_GROUP];

    if (!groupedBarEvents) {
      throw new Error("Expected grouped-bar mute events to be defined");
    }

    groupedBarEvents.mouseenter(firstRecord, new MouseEvent("mouseenter"), 1);

    expect(isMuted('[data-group-x="0"]')).toBe(true);
    expect(isMuted('[data-group-x="1"]')).toBe(false);

    groupedBarEvents.mouseleave();

    expect(isMuted('[data-group-x="0"]')).toBe(false);
    expect(isMuted('[data-group-x="1"]')).toBe(false);
  });

  it("reacts to chart type changes", () => {
    const chartType = ref<ChartType>("grouped-bar");
    const { barAttributes, barEvents, tooltipTriggers } = getUseChart({
      getType: () => chartType.value,
    });

    expect(
      barAttributes.value[GROUPED_BAR_GROUP]?.["data-group-x"],
    ).toBeTruthy();
    expect(barEvents.value[GROUPED_BAR_GROUP]).toBeTruthy();
    expect(tooltipTriggers.value[GROUPED_BAR_GROUP]).toBeTruthy();

    chartType.value = "stacked-bar";

    expect(
      barAttributes.value[STACKED_BAR_GROUP]?.["data-group-x"],
    ).toBeTruthy();
    expect(barEvents.value[STACKED_BAR_GROUP]).toBeTruthy();
    expect(tooltipTriggers.value[STACKED_BAR_GROUP]).toBeTruthy();

    chartType.value = "stacked-area";

    expect(barAttributes.value).toEqual({});
    expect(barEvents.value).toEqual({});
    expect(tooltipTriggers.value).toEqual({});
  });

  it("reacts to group record changes when formatting x-axis ticks", () => {
    const reactiveGroupRecords = ref([firstRecord]);
    const { getGroupX } = getUseChart({
      getGroupRecords: () => reactiveGroupRecords.value,
      groupXGetter: (record) => record.month,
    });

    expect(getGroupX(0)).toBe("January");

    reactiveGroupRecords.value = [
      { month: "March", sales: 30, returns: 40 },
      { month: "April", sales: 35, returns: 45 },
    ];

    expect(getGroupX(0)).toBe("March");
  });
});
