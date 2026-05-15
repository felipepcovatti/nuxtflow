import VisitsMapTooltipContent from "@/components/visits-map/tooltip/Content.vue";
import { TopoJSONMap } from "@unovis/ts";
import { render } from "vue";
import type { Country } from "~/types/visits";

export function useVisitsMap() {
  const { t } = useI18n({ useScope: "global" });

  const tooltipTriggers = computed(() => ({
    [TopoJSONMap.selectors.feature]: ({
      data,
      id,
    }: {
      data?: Country;
      id: string;
    }) => {
      const tooltip = document.createElement("div");
      const content: VNode = h(VisitsMapTooltipContent, {
        country: data?.name ?? id,
        visits: data?.formattedVisits ?? "0",
        visitsLabel: t("visits"),
      });
      render(content, tooltip);
      return tooltip;
    },
  }));

  return {
    tooltipTriggers,
  };
}
