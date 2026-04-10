<script
  lang="ts"
  setup
  generic="DataRecord extends Record<string, any>, ItemId extends string"
>
import { UiChartTooltipContent } from "#components";
import { Area, GroupedBar, StackedBar } from "@unovis/ts";
import {
  VisXYContainer,
  VisStackedBar,
  VisArea,
  VisGroupedBar,
  VisAxis,
  VisTooltip,
  VisCrosshair,
} from "@unovis/vue";
import { render } from "vue";

const props = withDefaults(
  defineProps<{
    type:
      | "grouped-bar"
      | "stacked-bar"
      | "stacked-area"
      | "horizontal-stacked-bar";
    items: Array<{ id: ItemId; color: string; label: string }>;
    dataRecords: DataRecord[];
    tooltipTitleGetter: (record: DataRecord) => string;
    hideAxis?: boolean;
    itemXGetter?: (record: DataRecord) => string;
    itemYGetter?: (record: DataRecord, itemId: ItemId) => number;
    height?: number;
  }>(),
  {
    itemYGetter: (record, itemId) => record[itemId],
    height: 418,
  },
);

const chartWrapperRef = useTemplateRef("chartWrapper");

function handleMutedState({
  attribute,
  value,
}:
  | { attribute: "data-item-id"; value: string | null }
  | { attribute: "data-item-position"; value: PositionType | null }) {
  if (!chartWrapperRef.value) return;
  const elements = chartWrapperRef.value.querySelectorAll(`[${attribute}]`);
  elements.forEach((element) => {
    element.classList.toggle(
      "muted",
      value !== null && value.toString() !== element.getAttribute(attribute),
    );
  });
}

const { isExtraSmall } = useIsExtraSmall();

function colorGetter(_: DataRecord, index: number) {
  return props.items[index]?.color ?? "";
}

function renderTooltip(record: DataRecord): HTMLDivElement {
  const items = props.items.map((item) => {
    return {
      color: item.color,
      label: item.label,
      value: props.itemYGetter(record, item.id),
    };
  });
  const tooltip = document.createElement("div");
  const content: VNode = h(UiChartTooltipContent, {
    items:
      props.type === "grouped-bar" || props.type === "horizontal-stacked-bar"
        ? items
        : items.reverse(),
    title: props.tooltipTitleGetter(record),
  });
  render(content, tooltip);
  return tooltip;
}

const dataGetters = computed(() => {
  return props.items.map((item) => {
    return (record: DataRecord) => props.itemYGetter(record, item.id);
  });
});

const itemPositionGetter = (_: DataRecord, index: number) => {
  return index;
};

const barSelectors = computed(() => {
  if (props.type === "stacked-area") return;
  return props.type === "grouped-bar"
    ? GroupedBar.selectors
    : StackedBar.selectors;
});

type PositionType = ReturnType<typeof itemPositionGetter>;

const hoveredItemPosition = ref<PositionType | null>(null);

watch(hoveredItemPosition, (position) =>
  handleMutedState({ attribute: "data-item-position", value: position }),
);

const barEvents = computed(() => {
  if (!barSelectors.value) return {};
  return {
    [barSelectors.value.barGroup]: {
      mouseenter: (_: DataRecord, __: MouseEvent, index: number) => {
        hoveredItemPosition.value = index;
      },
      mouseleave: () => (hoveredItemPosition.value = null),
    },
  };
});

const barAttributes = computed(() => {
  if (!barSelectors.value) return {};
  return {
    [barSelectors.value.barGroup]: {
      "data-item-position": itemPositionGetter,
    },
    [barSelectors.value.bar]: {
      "data-item-id": (_: DataRecord, index: number) =>
        props.items[index % props.items.length]?.id,
    },
  };
});

const AREA_ATRIBUTES = {
  [Area.selectors.area]: {
    "data-item-id": (_: DataRecord, index: number) =>
      props.items[index % props.items.length]?.id,
  },
} as const;

const xTickFormat = (value: number) => {
  if (!Number.isInteger(value)) return "";
  const record = props.dataRecords[value];
  if (!record || !props.itemXGetter) return value;
  return props.itemXGetter(record);
};

const triggers = computed(() => {
  if (!barSelectors.value) return {};
  return {
    [barSelectors.value.barGroup]: renderTooltip,
  };
});

const hoveredItemId = ref<string | null>(null);

watch(hoveredItemId, (id) =>
  handleMutedState({ attribute: "data-item-id", value: id }),
);
</script>
<template>
  <div class="flex flex-col gap-6">
    <div ref="chartWrapper" :style="{ height: height + 'px' }">
      <ClientOnly>
        <VisXYContainer :data="dataRecords" :height="height">
          <VisGroupedBar
            v-if="type === 'grouped-bar'"
            :x="itemPositionGetter"
            :y="dataGetters"
            :rounded-corners="4"
            :color="colorGetter"
            :events="barEvents"
            :attributes="barAttributes"
          />
          <VisStackedBar
            v-else-if="
              type === 'stacked-bar' || type === 'horizontal-stacked-bar'
            "
            :x="itemPositionGetter"
            :y="dataGetters"
            :rounded-corners="4"
            :bar-padding="0.25"
            :color="colorGetter"
            :events="barEvents"
            :attributes="barAttributes"
            :orientation="
              type === 'horizontal-stacked-bar' ? 'horizontal' : 'vertical'
            "
          />
          <VisArea
            v-else
            :x="itemPositionGetter"
            :y="dataGetters"
            :rounded-corners="4"
            :attributes="AREA_ATRIBUTES"
            :color="colorGetter"
          />
          <VisAxis
            v-if="!hideAxis"
            :tick-rotation="45"
            type="x"
            :grid-line="false"
            :tick-line="undefined"
            :domain-line="false"
            :tick-text-angle="isExtraSmall ? 90 : 0"
            :tick-format="xTickFormat"
            :tick-text-align="isExtraSmall ? 'left' : 'center'"
          />
          <VisAxis
            v-if="!isExtraSmall && !hideAxis"
            type="y"
            :grid-line="false"
            :tick-line="undefined"
            :domain-line="false"
          />
          <VisTooltip
            :triggers="triggers"
            :attributes="{ 'data-selector': 'tooltip' }"
            :horizontal-shift="12"
            horizontal-placement="left"
          />
          <VisCrosshair
            v-if="type === 'stacked-area'"
            :template="renderTooltip"
            :color="colorGetter"
          />
        </VisXYContainer>
      </ClientOnly>
    </div>
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="cursor-default"
        @mouseenter="hoveredItemId = String(item.id)"
        @mouseleave="hoveredItemId = null"
      >
        <UiChartLegendItem :color="item.color" :label="item.label" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@reference "@/assets/css/main.css";
div {
  :deep([data-selector="tooltip"]) {
    @apply tooltip;
  }
  :deep([data-item-id]),
  :deep([data-item-position]) {
    @apply [transition:opacity_200ms_ease_200ms];
    &.muted {
      @apply opacity-40!;
    }
  }
}
</style>
