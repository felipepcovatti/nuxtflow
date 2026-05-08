import { render } from "vue";
import MapTooltipContent from "~/components/visits-map/tooltip/Content.vue";
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR } from "~/constants/visits";
import type { Country, CountryVisitsRecord } from "~/types/visits";

export function getCountryColor({
  visits,
  highest,
  lowest,
}: {
  visits: number;
  highest: number;
  lowest: number;
}) {
  if (visits === 0) return DEFAULT_COUNTRY_COLOR;
  if (highest === lowest)
    return (
      COUNTRY_COLORS[Math.floor(COUNTRY_COLORS.length / 2)] ??
      DEFAULT_COUNTRY_COLOR
    );

  const stepSize = (highest - lowest) / COUNTRY_COLORS.length;

  const index = Math.min(
    Math.floor((visits - lowest) / stepSize),
    COUNTRY_COLORS.length - 1,
  );

  return COUNTRY_COLORS[index] ?? DEFAULT_COUNTRY_COLOR;
}

export function getHighestAndLowestCountryVisits(
  visits: CountryVisitsRecord[],
) {
  if (visits.length === 0) return { highest: 0, lowest: 0 };
  const values = visits.map(({ visits }) => visits);
  const highest = Math.max(...values);
  const lowest = Math.min(...values);
  return { highest, lowest };
}

export const visitsMapCountryCodeGetter = ({ country }: Country) => country;

export const visitsMapCountryColorGetter = ({ color }: Country) => color;

export function getCountryTooltip({
  country,
  visits,
  label,
}: {
  country: string;
  visits: string;
  label: string;
}): HTMLDivElement {
  const tooltip = document.createElement("div");
  const content: VNode = h(MapTooltipContent, {
    title: country,
    value: visits,
    label,
  });
  render(content, tooltip);
  return tooltip;
}
