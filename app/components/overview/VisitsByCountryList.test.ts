import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import VisitsByCountryList from "./VisitsByCountryList.vue";

function mountList() {
  return mountSuspended(VisitsByCountryList, {
    props: {
      totalVisits: 10357565,
      countries: [
        {
          country: "br",
          name: "Brazil",
          icon: "flag-br",
          color: "red-500",
          visits: 4234234,
          formattedVisits: "4,234,234",
        },
        {
          country: "us",
          name: "United States",
          icon: "flag-us",
          color: "blue-500",
          visits: 6123231,
          formattedVisits: "6,123,231",
        },
      ],
    },
  });
}
describe("VisitsByCountryList", () => {
  it("renders country names and visit counts", async () => {
    const wrapper = await mountList();
    expect(wrapper.text()).toContain("Brazil");
    expect(wrapper.text()).toContain("United States");
    expect(wrapper.text()).toContain("4,234,234");
    expect(wrapper.text()).toContain("6,123,231");
  });

  it("wires icons to NuxtIcon with correct names", async () => {
    const wrapper = await mountList();
    const icons = wrapper.findAllComponents({ name: "NuxtIcon" });
    expect(icons.length).toBeGreaterThanOrEqual(2);
    expect(icons.at(0)?.props("name")).toBe("flag-br");
    expect(icons.at(1)?.props("name")).toBe("flag-us");
  });

  it("applies correct width to progress bars", async () => {
    const wrapper = await mountList();
    const bars = wrapper.findAll(".bg-primary-700");
    expect(bars.length).toBe(2);
    expect(bars.at(0)?.attributes("style")).toBe("width: 40.9%;");
    expect(bars.at(1)?.attributes("style")).toBe("width: 59.1%;");
  });
});
