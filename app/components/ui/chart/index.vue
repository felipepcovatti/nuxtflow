<script
  lang="ts"
  setup
  generic="DataRecord extends Record<string, any>, ItemId extends string"
>
import {
  VisXYContainer,
  VisStackedBar,
  VisArea,
  VisGroupedBar,
  VisAxis,
  VisTooltip,
  VisCrosshair,
} from "@unovis/vue";
import type { ChartType } from "~/types/chart";

const props = withDefaults(
  defineProps<{
    type: ChartType;
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

const { isExtraSmall } = useIsExtraSmall();

const wrapperRef = useTemplateRef("chartWrapper");

const {
  areaAttributes,
  barAttributes,
  barEvents,
  colorGetter,
  getXAxisTick,
  itemYGetters,
  muteOtherBars,
  renderTooltip,
  unmuteAllBars,
  tooltipTriggers,
  itemXGetter,
} = useChart({
  getType: () => props.type,
  getDataRecords: () => props.dataRecords,
  items: props.items,
  tooltipTitleGetter: props.tooltipTitleGetter,
  xAxisTickGetter: props.itemXGetter,
  itemYGetter: props.itemYGetter,
  wrapperRef,
});
</script>
<template>
  <div class="flex flex-col gap-6">
    <div ref="chartWrapper" :style="{ height: height + 'px' }">
      <ClientOnly>
        <VisXYContainer :data="dataRecords" :height="height">
          <VisGroupedBar
            v-if="type === 'grouped-bar'"
            :x="itemXGetter"
            :y="itemYGetters"
            :rounded-corners="4"
            :color="colorGetter"
            :events="barEvents"
            :attributes="barAttributes"
          />
          <VisStackedBar
            v-else-if="
              type === 'stacked-bar' || type === 'horizontal-stacked-bar'
            "
            :x="itemXGetter"
            :y="itemYGetters"
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
            :x="itemXGetter"
            :y="itemYGetters"
            :rounded-corners="4"
            :attributes="areaAttributes"
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
            :tick-format="getXAxisTick"
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
            :triggers="tooltipTriggers"
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
        @mouseenter="muteOtherBars(item.id)"
        @mouseleave="unmuteAllBars"
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
