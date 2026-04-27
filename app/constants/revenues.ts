import type { Department } from "~/types/revenue";

export const DEPARTMENTS: ReadonlyArray<{ id: Department; color: string }> = [
  { id: "electronics", color: "var(--color-primary-700)" },
  { id: "home_living", color: "var(--color-orange-300)" },
  { id: "clothing_accessories", color: "var(--color-teal-400)" },
];
