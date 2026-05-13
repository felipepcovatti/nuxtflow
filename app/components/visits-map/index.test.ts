import { describe, expect, it, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import VisitsMap from "./index.vue";

vi.mock("@unovis/ts", async () => {
  const actual = await vi.importActual("@unovis/ts");
  return {
    ...actual,
    TopoJSONMap: { selectors: { feature: "country-selector" } },
  };
});

vi.mock("@unovis/vue", () => ({
  VisSingleContainer: {
    name: "VisSingleContainer",
    template: "<div><slot/></div>",
    props: ["data", "height"],
  },
  VisTopoJSONMap: {
    name: "VisTopoJSONMap",
    template: "<div />",
    props: ["topojson", "areaColor", "areaId", "zoomExtent", "duration"],
  },
  VisTooltip: {
    name: "VisTooltip",
    template: "<div />",
    props: ["triggers", "attributes", "verticalPlacement", "verticalShift"],
  },
}));

const countries = [
  {
    country: "BR",
    name: "Brazil",
    visits: 100,
    color: "#ffffff",
    formattedVisits: "100",
    icon: "",
  },
  {
    country: "US",
    name: "United States",
    visits: 300,
    color: "#000000",
    formattedVisits: "300",
    icon: "",
  },
];

describe("VisitsMap", () => {
  it("renders countries and provides map getters and configuration", async () => {
    const wrapper = await mountSuspended(VisitsMap, {
      props: { countries },
    });

    const container = wrapper.getComponent({ name: "VisSingleContainer" });
    expect(container.props("data").areas).toEqual(countries);

    const map = wrapper.getComponent({ name: "VisTopoJSONMap" });
    const areaColor = map.props("areaColor");
    const areaId = map.props("areaId");
    expect(areaColor).toBeTypeOf("function");
    expect(areaId).toBeTypeOf("function");
    expect(areaId(countries[0])).toBe("BR");
    expect(areaColor(countries[0])).toBe("#ffffff");

    expect(map.props("topojson")).toMatchObject({
      type: "Topology",
      objects: {
        countries: {
          type: "GeometryCollection",
          geometries: expect.any(Array),
        },
      },
    });
    expect(map.props("zoomExtent")).toEqual([1, 6]);
    expect(map.props("duration")).toBe(200);
  });

  it("renders tooltip trigger with localized country content", async () => {
    const wrapper = await mountSuspended(VisitsMap, {
      props: { countries },
    });

    const tooltip = wrapper.getComponent({ name: "VisTooltip" });
    expect(tooltip.props("attributes")["data-selector"]).toBe("tooltip");
    expect(tooltip.props("verticalPlacement")).toBe("bottom");
    expect(tooltip.props("verticalShift")).toBe(16);

    const tooltipTrigger = tooltip.props("triggers")["country-selector"];
    expect(tooltipTrigger).toBeTypeOf("function");

    const tooltipElement = tooltipTrigger({ data: countries[0], id: "BR" });
    expect(tooltipElement.textContent).toContain("Brazil");
    expect(tooltipElement.textContent).toContain("Visits");
    expect(tooltipElement.textContent).toContain("100");
  });
});
