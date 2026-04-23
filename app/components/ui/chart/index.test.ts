import {
  describe,
  it,
  expect,
  afterEach,
  vi,
  afterAll,
  beforeAll,
} from "vitest";
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
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
  });

  afterAll(() => {
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

  const chartTypes = [
    {
      type: "stacked-bar",
      selector: "[data-test='stacked-bar']",
    },
    {
      type: "horizontal-stacked-bar",
      selector: "[data-test='stacked-bar']",
    },
    {
      type: "grouped-bar",
      selector: "[data-test='grouped-bar']",
    },
    { type: "stacked-area", selector: "[data-test='area']" },
  ] as const;

  describe("rendering", () => {
    it.each(chartTypes)(
      'renders the "$type" variant with tooltip and legend',
      async ({ type, selector }) => {
        const wrapper = await mountSuspended(Chart, {
          props: {
            type,
            items: mockItems,
            dataRecords: mockDataRecords,
            tooltipTitleGetter: (record) => record.month,
          },
        });

        expect(wrapper.find(selector).exists()).toBe(true);
        expect(wrapper.find("[data-test='tooltip']").exists()).toBe(true);

        const legendItems = wrapper.findAllComponents({
          name: "UiChartLegendItem",
        });
        expect(legendItems).toHaveLength(mockItems.length);
      },
    );

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
  });
});
