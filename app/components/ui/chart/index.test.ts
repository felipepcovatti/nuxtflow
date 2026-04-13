import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Chart from "./index.vue";

vi.mock("@unovis/vue", () => ({
  VisXYContainer: {
    template: "<div ><slot /></div>",
  },
  VisStackedBar: { template: "<div data-test='stacked-bar' />" },
  VisGroupedBar: { template: "<div data-test='grouped-bar' />" },
  VisArea: { template: "<div data-test='area' />" },
  VisAxis: { template: "<div data-test='axis' />" },
  VisTooltip: { template: "<div data-test='tooltip' />" },
  VisCrosshair: { template: "<div data-test='crosshair' />" },
}));

describe("Chart", () => {
  // Prevent unhandled errors from charting library background timers
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const mockItems = [
    { id: "item1", color: "#ff0000", label: "Item 1" },
    { id: "item2", color: "#00ff00", label: "Item 2" },
  ];

  const mockDataRecords = [
    { month: "Jan", item1: 100, item2: 200 },
    { month: "Feb", item1: 150, item2: 250 },
    { month: "Mar", item1: 200, item2: 300 },
  ];

  describe("rendering", () => {
    it("renders with stacked-bar type", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      expect(wrapper.find("[data-test='stacked-bar']").exists()).toBe(true);
    });

    it("renders with horizontal-stacked-bar type", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "horizontal-stacked-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      expect(wrapper.find("[data-test='stacked-bar']").exists()).toBe(true);
    });

    it("renders with grouped-bar type", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "grouped-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      expect(wrapper.find("[data-test='grouped-bar']").exists()).toBe(true);
    });

    it("renders with stacked-area type", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-area",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });
      expect(wrapper.find("[data-test='area']").exists()).toBe(true);
    });

    it("hides axis when hideAxis is true", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
          hideAxis: true,
        },
      });

      expect(wrapper.find("[data-test='axis']").exists()).toBe(false);
    });

    it("renders tooltip", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      expect(wrapper.find("[data-test='tooltip']").exists()).toBe(true);
    });

    it("renders crosshair for stacked-area", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-area",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      expect(wrapper.find("[data-test='crosshair']").exists()).toBe(true);
    });

    it("renders legend for items", async () => {
      const wrapper = await mountSuspended(Chart, {
        props: {
          type: "stacked-bar",
          items: mockItems,
          dataRecords: mockDataRecords,
          tooltipTitleGetter: (record) => record.month,
        },
      });

      const legendItems = wrapper.findAllComponents({
        name: "UiChartLegendItem",
      });
      expect(legendItems).toHaveLength(mockItems.length);
    });
  });
});
