import type { Device } from "~/types/visits";

export const DEVICES: ReadonlyArray<{
  id: Device;
  color: string;
  icon: string;
}> = [
  {
    id: "desktop",
    color: "var(--color-primary-700)",
    icon: "flowbite:desktop-pc-solid",
  },
  {
    id: "mobile",
    color: "var(--color-orange-300)",
    icon: "flowbite:mobile-phone-solid",
  },
  {
    id: "tablet",
    color: "var(--color-teal-400)",
    icon: "flowbite:tablet-solid",
  },
];

export const COUNTRY_COLORS: ReadonlyArray<string> = [
  "var(--color-primary-200)",
  "var(--color-primary-300)",
  "var(--color-primary-400)",
  "var(--color-primary-500)",
  "var(--color-primary-600)",
  "var(--color-primary-700)",
  "var(--color-primary-800)",
  "var(--color-primary-900)",
];

export const DEFAULT_COUNTRY_COLOR = "var(--vis-map-feature-color)";
