import { GroupedBar, StackedBar } from "@unovis/ts";
import type { BarChartType } from "~/types/chart";

export const SELECTOR_BY_BAR_CHART_TYPE: Readonly<
  Record<BarChartType, { bar: string; barGroup: string }>
> = {
  "grouped-bar": {
    bar: GroupedBar.selectors.bar,
    barGroup: GroupedBar.selectors.barGroup,
  },
  "stacked-bar": {
    bar: StackedBar.selectors.bar,
    barGroup: StackedBar.selectors.barGroup,
  },
  "horizontal-stacked-bar": {
    bar: StackedBar.selectors.bar,
    barGroup: StackedBar.selectors.barGroup,
  },
};
