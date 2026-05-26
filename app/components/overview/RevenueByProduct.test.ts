import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import RevenueByProduct from "./RevenueByProduct.vue";
import type { RevenueByProductResponse } from "~/types/revenue";

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref<Partial<RevenueByProductResponse>>({
      data: {
        revenues: Array.from(Array(11), (_, index) => ({
          revenue: (index + 1) * 1000,
          product: {
            id: `product-${index + 1}`,
            name: `Product ${index + 1}`,
            slug: `product-${index + 1}`,
            department: index % 2 === 0 ? "electronics" : "home_living",
            category: index % 2 === 0 ? "audio" : "furniture",
          },
        })),
        total_revenue: 110000,
        total_revenue_growth_percentage: 12.3,
      },
    }),
    pending: ref(false),
  });
});

describe("RevenueByProduct", () => {
  it("renders the formatted total revenue and product report link", async () => {
    const wrapper = await mountSuspended(RevenueByProduct);

    expect(wrapper.text()).toContain("$110,000");
    expect(wrapper.text()).toContain("Products by revenue");

    const link = wrapper.find("a");
    expect(link.text()).toContain("View product report");
    expect(link.attributes("href")).toBe("/product-report");
  });

  it("renders only the top 10 products and its data", async () => {
    const wrapper = await mountSuspended(RevenueByProduct);

    expect(wrapper.text()).toContain("Product 1");
    expect(wrapper.text()).toContain("Product 10");
    expect(wrapper.text()).not.toContain("Product 11");
    expect(wrapper.text()).toContain("Electronics/Audio");
    expect(wrapper.text()).toContain("Home & Living/Furniture");
    expect(wrapper.text()).toContain("$1,000");
    expect(wrapper.text()).toContain("$10,000");
  });

  it("renders the growth percentage in the header", async () => {
    const wrapper = await mountSuspended(RevenueByProduct);

    expect(wrapper.find("header").text()).toContain("12.3%");
  });

  it("renders the period select in the footer with the correct initial value", async () => {
    const wrapper = await mountSuspended(RevenueByProduct);

    const periodSelect = wrapper
      .find("footer")
      .findComponent({ name: "PeriodSelect" });

    expect(periodSelect.props("modelValue")).toBe("7D");
  });
});
