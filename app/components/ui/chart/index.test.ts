import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Chart from "./index.vue";
import type { ChartType } from "~/types/chart";

vi.mock("@unovis/vue", () => ({
  VisXYContainer: {
    name: "VisXYContainer",
    template: "<div><slot/></div>",
    props: ["data", "height"],
  },
  VisStackedBar: {
    name: "VisStackedBar",
    template: "<div />",
    props: [
      "x",
      "y",
      "roundedCorners",
      "color",
      "events",
      "attributes",
      "orientation",
      "barPadding",
    ],
  },
  VisGroupedBar: {
    name: "VisGroupedBar",
    template: "<div />",
    props: ["x", "y", "roundedCorners", "color", "events", "attributes"],
  },
  VisArea: {
    name: "VisArea",
    template: "<div />",
    props: ["x", "y", "roundedCorners", "attributes", "color"],
  },
  VisAxis: {
    name: "VisAxis",
    template: "<div />",
    props: [
      "type",
      "tickRotation",
      "gridLine",
      "tickLine",
      "domainLine",
      "tickTextAngle",
      "tickFormat",
      "tickTextAlign",
    ],
  },
  VisTooltip: {
    name: "VisTooltip",
    template: "<div />",
    props: [
      "triggers",
      "attributes",
      "verticalPlacement",
      "verticalShift",
      "horizontalShift",
      "horizontalPlacement",
    ],
  },
  VisCrosshair: {
    name: "VisCrosshair",
    template: "<div />",
    props: ["template", "color"],
  },
}));

async function mountChart({
  type,
  hideAxis,
}: {
  type: ChartType;
  hideAxis?: boolean;
}) {
  return await mountSuspended(Chart, {
    props: {
      type,
      items: [
        { id: "item1", color: "#ff0000", label: "Item 1" },
        { id: "item2", color: "#00ff00", label: "Item 2" },
      ],
      groupRecords: [
        { month: "Jan", item1: 100, item2: 200 },
        { month: "Feb", item1: 150, item2: 250 },
        { month: "Mar", item1: 200, item2: 300 },
      ],
      tooltipTitleGetter: ({ month }) => month,
      hideAxis,
    },
  });
}

describe("Chart", () => {
  it.each([
    {
      type: "stacked-bar",
      component: "VisStackedBar",
    },
    {
      type: "horizontal-stacked-bar",
      component: "VisStackedBar",
    },
    {
      type: "grouped-bar",
      component: "VisGroupedBar",
    },
    {
      type: "stacked-area",
      component: "VisArea",
    },
  ] as const)(
    'renders the "$type" variant with tooltip and legend',
    async ({ type, component }) => {
      const wrapper = await mountChart({ type });

      expect(wrapper.findComponent({ name: component }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "VisTooltip" }).exists()).toBe(true);

      const legendItems = wrapper.findAllComponents({
        name: "UiChartLegendItem",
      });
      expect(legendItems).toHaveLength(2);
      expect(legendItems.map((item) => item.props())).toEqual([
        { color: "#ff0000", label: "Item 1" },
        { color: "#00ff00", label: "Item 2" },
      ]);
    },
  );

  it("renders crosshair for stacked-area", async () => {
    const wrapper = await mountChart({ type: "stacked-area" });

    expect(wrapper.findComponent({ name: "VisCrosshair" }).exists()).toBe(true);
  });

  it("hides axis when hideAxis is true", async () => {
    const wrapper = await mountChart({ type: "stacked-bar", hideAxis: true });

    expect(wrapper.findComponent({ name: "VisAxis" }).exists()).toBe(false);
  });
});
