import { UiChartTooltipContent } from "#components";
import { Area } from "@unovis/ts";
import { render, h, type TemplateRef } from "vue";
import { SELECTOR_BY_BAR_CHART_TYPE } from "~/constants/chart";
import type { ChartItem, ChartType } from "~/types/chart";

export function useChart<
  Data extends Record<string, any>,
  ItemId extends string,
>({
  wrapperRef,
  getType,
  items,
  getDataRecords,
  tooltipTitleGetter,
  xAxisTickGetter,
  itemYGetter,
}: {
  wrapperRef: TemplateRef<HTMLDivElement>;
  getType: () => ChartType;
  getDataRecords: () => Data[];
  items: ChartItem<ItemId>[];
  tooltipTitleGetter: (record: Data) => string;
  xAxisTickGetter?: (record: Data) => string;
  itemYGetter: (record: Data, itemId: ItemId) => number;
}) {
  const chartType = computed(() => getType());

  const barSelectors = computed(() => {
    if (chartType.value === "stacked-area") return null;
    return SELECTOR_BY_BAR_CHART_TYPE[chartType.value];
  });

  function muteOthers({
    attribute,
    value,
  }:
    | { attribute: "data-item-id"; value: string }
    | { attribute: "data-item-position"; value: number }) {
    if (!wrapperRef.value) return;
    const elements = wrapperRef.value.querySelectorAll(`[${attribute}]`);
    elements.forEach((element) => {
      element.classList.toggle(
        "muted",
        value.toString() !== element.getAttribute(attribute),
      );
    });
  }

  function unmuteAllBars() {
    if (!wrapperRef.value) return;
    const elements = wrapperRef.value.querySelectorAll(
      `[data-item-id], [data-item-position]`,
    );
    elements.forEach((element) => {
      element.classList.remove("muted");
    });
  }

  function muteOtherBars(id: string) {
    muteOthers({ attribute: "data-item-id", value: id });
  }
  function muteOtherBarGroups(position: number) {
    muteOthers({ attribute: "data-item-position", value: position });
  }

  function renderTooltip(record: Data): HTMLDivElement {
    const tooltipItems = items.map((item) => {
      return {
        color: item.color,
        label: item.label,
        value: itemYGetter(record, item.id),
      };
    });
    const tooltip = document.createElement("div");
    const content: VNode = h(UiChartTooltipContent, {
      items:
        chartType.value === "grouped-bar" ||
        chartType.value === "horizontal-stacked-bar"
          ? tooltipItems
          : tooltipItems.reverse(),
      title: tooltipTitleGetter(record),
    });
    render(content, tooltip);
    return tooltip;
  }

  const barEvents = computed(() => {
    if (!barSelectors.value) return {};
    return {
      [barSelectors.value.barGroup]: {
        mouseenter: (_: Data, __: MouseEvent, index: number) => {
          muteOtherBarGroups(index);
        },
        mouseleave: unmuteAllBars,
      },
    };
  });

  function itemXGetter(_: Data, index: number) {
    return index;
  }
  const barAttributes = computed(() => {
    if (!barSelectors.value) return {};
    return {
      [barSelectors.value.bar]: {
        "data-item-id": (_: Data, index: number) =>
          items[index % items.length]?.id,
      },
      [barSelectors.value.barGroup]: {
        "data-item-position": itemXGetter,
      },
    };
  });

  const areaAttributes = {
    [Area.selectors.area]: {
      "data-item-id": (_: Data, index: number) =>
        items[index % items.length]?.id,
    },
  } as const;

  function getXAxisTick(value: number) {
    if (!Number.isInteger(value)) return "";
    const records = getDataRecords();
    const record = records[value];
    if (!record || !xAxisTickGetter) return value;
    return xAxisTickGetter(record);
  }

  function colorGetter(_: Data, index: number) {
    return items[index]?.color ?? "";
  }

  const itemYGetters = computed(() =>
    items.map((item) => (record: Data) => itemYGetter(record, item.id)),
  );

  const tooltipTriggers = computed(() => {
    if (!barSelectors.value) return {};
    return {
      [barSelectors.value.barGroup]: renderTooltip,
    };
  });

  return {
    unmuteAllBars,
    muteOtherBars,
    barAttributes,
    barEvents,
    renderTooltip,
    getXAxisTick,
    colorGetter,
    itemYGetters,
    areaAttributes,
    itemXGetter,
    tooltipTriggers,
  };
}
