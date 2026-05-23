import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useDepartmentRevenues } from "./useDepartmentRevenues";

const { mockedRefresh } = vi.hoisted(() => ({
  mockedRefresh: vi.fn(),
}));

mockNuxtImport("useApi", async () => {
  const { ref } = await import("vue");
  return () => ({
    data: ref({
      data: {
        revenues: [
          {
            date: "2026-05-20",
            revenues: {
              electronics: 100,
              home_living: 200,
              clothing_accessories: 300,
            },
          },
        ],
        total_revenue: 600,
      },
    }),
    pending: ref(false),
    refresh: mockedRefresh,
  });
});
mockNuxtImport("useI18n", () => () => ({
  locale: { value: "en" },
  t: (key: string) => key,
}));

describe("useDepartmentRevenues", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-05-20T12:00:00.000Z"));
    mockedRefresh.mockClear();
  });

  it("returns revenues list, formatted totalRevenue and pending state", () => {
    const { revenues, totalRevenue, pending } = useDepartmentRevenues();
    expect(revenues.value).toEqual([
      {
        date: "2026-05-20",
        revenues: {
          electronics: 100,
          home_living: 200,
          clothing_accessories: 300,
        },
      },
    ]);
    expect(totalRevenue.value).toBe("$600");
    expect(pending.value).toBe(false);
  });

  it("returns correct revenues date with revenuesDateGetter", () => {
    const { revenuesDateGetter } = useDepartmentRevenues();
    const date = revenuesDateGetter({
      date: "2026-05-20",
      revenues: {
        electronics: 100,
        home_living: 200,
        clothing_accessories: 300,
      },
    });
    expect(date).toBe("today");
  });

  it("returns correct chart type for the given revenues lentgh", () => {
    const { chartType } = useDepartmentRevenues();
    expect(chartType.value).toBe("grouped-bar");
  });

  it("returns the full date with revenuesFullDateGetter", () => {
    const { revenuesFullDateGetter } = useDepartmentRevenues();
    const fullDate = revenuesFullDateGetter({
      date: "2026-05-20",
      revenues: {
        electronics: 100,
        home_living: 200,
        clothing_accessories: 300,
      },
    });
    expect(fullDate).toBe("May 20, 2026");
  });

  it("exposes api refresh method", () => {
    const { refresh } = useDepartmentRevenues();
    refresh();
    expect(mockedRefresh).toHaveBeenCalledOnce();
  });
});
