import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDateRangePicker } from "./useDateRangePicker";
import { type EffectScope, effectScope, nextTick, ref, type Ref } from "vue";
import type { DateRange } from "~/types/date";
import { CalendarDate } from "@internationalized/date";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const { onRangeSelected } = vi.hoisted(() => ({
  onRangeSelected: vi.fn(),
}));

mockNuxtImport("useI18n", () => () => ({
  locale: { value: "en" },
}));

vi.mock("@internationalized/date", async () => {
  const actual = await vi.importActual("@internationalized/date");
  return {
    ...actual,
    today: () => new CalendarDate(2026, 5, 21),
  };
});

describe("useDateRangePicker", () => {
  let scope: EffectScope | null = null;

  beforeEach(() => {
    if (scope) {
      scope.stop();
      scope = null;
    }
    onRangeSelected.mockClear();
  });

  function createComposable(
    { range }: { range: Ref<DateRange> } = {
      range: ref({
        start: "2026-05-15T00:00:00.000Z",
        end: "2026-05-21T00:00:00.000Z",
      }),
    },
  ) {
    scope = effectScope();

    const composable = scope.run(() =>
      useDateRangePicker({ range, onRangeSelected }),
    );

    if (!composable)
      throw new Error("Failed to create useDateRangePicker composable");
    return composable;
  }

  it("initializes with correct min and max dates", () => {
    const { minDate, maxDate } = createComposable();
    expect(minDate.value).toMatchObject({ year: 2025, month: 5, day: 22 });
    expect(maxDate.value).toMatchObject({ year: 2026, month: 5, day: 21 });
  });

  it("updates range and formatedRange when rangeModel changes", async () => {
    const range = ref({
      start: "2026-05-15T00:00:00.000Z",
      end: "2026-05-20T00:00:00.000Z",
    });
    const { rangeModel, formatedRange } = createComposable({ range });

    expect(rangeModel.value).toMatchObject({
      start: { year: 2026, month: 5, day: 15 },
      end: { year: 2026, month: 5, day: 20 },
    });

    expect(formatedRange.value).toMatchObject({
      start: "May 15",
      end: "May 20",
    });

    rangeModel.value = {
      start: new CalendarDate(2026, 5, 10),
      end: new CalendarDate(2026, 5, 15),
    };

    await nextTick();

    expect(range.value).toMatchObject({
      start: "2026-05-10T00:00:00.000Z",
      end: "2026-05-15T23:59:59.999Z",
    });

    expect(formatedRange.value).toMatchObject({
      start: "May 10",
      end: "May 15",
    });
  });

  it("updates rangeModel when presetModel changes", async () => {
    const { presetModel, rangeModel } = createComposable();

    expect(presetModel.value).toBe("7D");

    expect(rangeModel.value).toMatchObject({
      start: { year: 2026, month: 5, day: 15 },
      end: { year: 2026, month: 5, day: 21 },
    });

    presetModel.value = "1Y";

    await nextTick();

    expect(rangeModel.value).toMatchObject({
      start: { year: 2025, month: 5, day: 22 },
      end: { year: 2026, month: 5, day: 21 },
    });
  });

  it("updates presetModel when rangeModel changes", async () => {
    const { presetModel, rangeModel } = createComposable();

    expect(presetModel.value).toBe("7D");

    rangeModel.value = {
      start: new CalendarDate(2026, 4, 22),
      end: new CalendarDate(2026, 5, 21),
    };

    await nextTick();

    expect(presetModel.value).toBe("30D");

    rangeModel.value = {
      start: new CalendarDate(2026, 4, 10),
      end: new CalendarDate(2026, 5, 1),
    };

    await nextTick();

    expect(presetModel.value).toBeUndefined();
  });

  it("does not update rangeModel nor presetModel if presetModel is set to undefined", async () => {
    const { presetModel, rangeModel } = createComposable();

    expect(presetModel.value).toBe("7D");

    expect(rangeModel.value).toMatchObject({
      start: { year: 2026, month: 5, day: 15 },
      end: { year: 2026, month: 5, day: 21 },
    });

    presetModel.value = undefined;

    await nextTick();

    expect(rangeModel.value).toMatchObject({
      start: { year: 2026, month: 5, day: 15 },
      end: { year: 2026, month: 5, day: 21 },
    });

    expect(presetModel.value).toBe("7D");
  });

  it("closes the picker when rangeModel changes", async () => {
    const { isOpen, rangeModel } = createComposable();

    expect(isOpen.value).toBe(false);

    isOpen.value = true;

    await nextTick();

    expect(isOpen.value).toBe(true);

    rangeModel.value = {
      start: new CalendarDate(2026, 4, 22),
      end: new CalendarDate(2026, 5, 21),
    };

    await nextTick();

    expect(isOpen.value).toBe(false);
  });

  it("sets end date to today if it is closed without an end date", async () => {
    const { isOpen, rangeModel } = createComposable();

    isOpen.value = true;

    await nextTick();

    rangeModel.value = {
      start: new CalendarDate(2026, 4, 22),
      end: undefined,
    };

    await nextTick();

    expect(isOpen.value).toBe(true);

    isOpen.value = false;

    await nextTick();

    expect(isOpen.value).toBe(false);
    expect(rangeModel.value).toMatchObject({
      start: { year: 2026, month: 4, day: 22 },
      end: { year: 2026, month: 5, day: 21 },
    });
  });

  it("calls onRangeSelected when rangeModel changes", async () => {
    const { rangeModel } = createComposable();
    rangeModel.value = {
      start: new CalendarDate(2026, 4, 22),
      end: new CalendarDate(2026, 5, 21),
    };

    await nextTick();

    expect(onRangeSelected).toHaveBeenCalledTimes(1);
  });

  it("calls onRangeSelected when the current range is selected again", async () => {
    const { rangeModel } = createComposable();
    rangeModel.value = {
      start: new CalendarDate(2026, 5, 15),
      end: new CalendarDate(2026, 5, 21),
    };

    await nextTick();

    expect(onRangeSelected).toHaveBeenCalledTimes(1);

    rangeModel.value = {
      start: new CalendarDate(2026, 5, 15),
      end: new CalendarDate(2026, 5, 21),
    };

    await nextTick();

    expect(onRangeSelected).toHaveBeenCalledTimes(2);
  });

  it("call onRangeSelected when presetModel changes", async () => {
    const { presetModel } = createComposable();

    expect(presetModel.value).toBe("7D");

    expect(onRangeSelected).toHaveBeenCalledTimes(0);

    presetModel.value = "1Y";

    await nextTick();

    expect(onRangeSelected).toHaveBeenCalledTimes(1);
  });

  it("call onRangeSelected when the current preset is selected again", async () => {
    const { presetModel } = createComposable();

    expect(presetModel.value).toBe("7D");

    presetModel.value = "7D";

    await nextTick();

    expect(onRangeSelected).toHaveBeenCalledTimes(1);
  });
});
