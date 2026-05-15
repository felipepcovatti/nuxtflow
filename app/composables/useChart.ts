import { Area } from "@unovis/ts";
import { render, h, type TemplateRef } from "vue";
import UiChartTooltipContent from "~/components/ui/chart/tooltip/Content.vue";
import { SELECTOR_BY_BAR_CHART_TYPE } from "~/constants/chart";
import type { ChartItem, ChartType } from "~/types/chart";

export interface UseChartOptions<
  GroupRecord extends Record<string, any> = Record<string, any>,
  ItemId extends string = string,
> {
  wrapperRef: TemplateRef<HTMLDivElement>;
  getType: () => ChartType;
  getGroupRecords: () => GroupRecord[];
  items: ChartItem<ItemId>[];
  tooltipTitleGetter: (record: GroupRecord) => string;
  groupXGetter?: (record: GroupRecord) => string;
  itemYGetter: (record: GroupRecord, itemId: ItemId) => number;
}

export function useChart<
  GroupRecord extends Record<string, any>,
  ItemId extends string,
>({
  wrapperRef,
  getType,
  items,
  getGroupRecords,
  tooltipTitleGetter,
  groupXGetter,
  itemYGetter,
}: UseChartOptions<GroupRecord, ItemId>) {
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
    | { attribute: "data-group-x"; value: number }) {
    if (!wrapperRef.value) return;
    const elements = wrapperRef.value.querySelectorAll(`[${attribute}]`);
    elements.forEach((element) => {
      element.classList.toggle(
        "muted",
        value.toString() !== element.getAttribute(attribute),
      );
    });
  }

  function unmuteAll() {
    if (!wrapperRef.value) return;
    const elements = wrapperRef.value.querySelectorAll(
      `[data-item-id], [data-group-x]`,
    );
    elements.forEach((element) => {
      element.classList.remove("muted");
    });
  }

  function muteOtherItems(id: string) {
    muteOthers({ attribute: "data-item-id", value: id });
  }
  function muteOtherGroups(x: number) {
    muteOthers({ attribute: "data-group-x", value: x });
  }

  function generateTooltipHtml(record: GroupRecord): HTMLDivElement {
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
        mouseenter: (_: GroupRecord, __: MouseEvent, index: number) => {
          muteOtherGroups(index);
        },
        mouseleave: unmuteAll,
      },
    };
  });

  const barAttributes = computed(() => {
    if (!barSelectors.value) return {};
    return {
      [barSelectors.value.bar]: {
        "data-item-id": (_: GroupRecord, index: number) =>
          items[index % items.length]?.id,
      },
      [barSelectors.value.barGroup]: {
        "data-group-x": chartGroupXGetter,
      },
    };
  });

  const areaAttributes = {
    [Area.selectors.area]: {
      "data-item-id": (_: GroupRecord, index: number) =>
        items[index % items.length]?.id,
    },
  } as const;

  function getGroupX(value: number) {
    if (!Number.isInteger(value)) return "";
    const records = getGroupRecords();
    const record = records[value];
    if (!record || !groupXGetter) return value;
    return groupXGetter(record);
  }

  function colorGetter(_: GroupRecord, index: number) {
    return items[index]?.color ?? "";
  }

  const itemYGetters = computed(() =>
    items.map((item) => (record: GroupRecord) => itemYGetter(record, item.id)),
  );

  const tooltipTriggers = computed(() => {
    if (!barSelectors.value) return {};
    return {
      [barSelectors.value.barGroup]: generateTooltipHtml,
    };
  });

  return {
    unmuteAll,
    muteOtherItems,
    barAttributes,
    barEvents,
    generateTooltipHtml,
    getGroupX,
    colorGetter,
    itemYGetters,
    areaAttributes,
    tooltipTriggers,
  };
}
