import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import RevenueChart from "./RevenueByDepartment.vue";

vi.mock("@unovis/vue", () => ({
  VisXYContainer: true,
}));

const { mockUseFetch } = vi.hoisted(() => ({
  mockUseFetch: vi.fn(),
}));

mockNuxtImport("useFetch", () => mockUseFetch);

const mockProducts = [
  { id: "prod_a", name: "Product A" },
  { id: "prod_b", name: "Product B" },
  { id: "prod_c", name: "Product C" },
];

const mockSuccessData = {
  total: 600,
  products: mockProducts,
  week_records: [
    {
      day_of_the_week: 0,
      product_revenues: [
        { product_id: "prod_a", amount: 100 },
        { product_id: "prod_b", amount: 200 },
        { product_id: "prod_c", amount: 300 },
      ],
    },
  ],
};

describe("RevenueChart", () => {
  describe("pending state", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: ref(null),
        error: ref(null),
        pending: ref(true),
        refresh: vi.fn(),
      });
    });
    it("shows a loading spinner", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.find(".animate-spin").exists()).toBe(true);
    });

    it("does not render the chart or legend", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.find(".rounded-full").exists()).toBe(false);
    });
  });

  describe("error state", () => {
    const refresh = vi.fn();
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: ref(null),
        error: ref({ statusMessage: "Internal Server Error" }),
        pending: ref(false),
        refresh,
      });
    });

    it("shows the error status message", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.text()).toContain("Internal Server Error");
    });

    it("shows the retry button", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.get("button").text()).toBe("Try again");
    });

    it("calls refresh when retry is clicked", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      await wrapper.get("button").trigger("click");

      expect(refresh).toHaveBeenCalledOnce();
    });

    it("does not render the spinner", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.find(".animate-spin").exists()).toBe(false);
    });
  });

  describe("success state", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: ref(mockSuccessData),
        error: ref(null),
        pending: ref(false),
        refresh: vi.fn(),
      });
    });

    it("displays the formatted total", async () => {
      const wrapper = await mountSuspended(RevenueChart);

      expect(wrapper.text()).toContain("$600.00");
    });

    it("renders one legend bullet per product", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.findAll(".rounded-full")).toHaveLength(
        mockProducts.length,
      );
    });

    it("renders each product name in the legend", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      const text = wrapper.text();
      mockProducts.forEach(({ name }) => expect(text).toContain(name));
    });

    it("does not render the spinner or error block", async () => {
      const wrapper = await mountSuspended(RevenueChart);
      expect(wrapper.find(".animate-spin").exists()).toBe(false);
      expect(wrapper.find("button").exists()).toBe(false);
    });
  });
});
