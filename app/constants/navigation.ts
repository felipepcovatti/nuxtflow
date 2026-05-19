import type { NavigationItem } from "~/types/navigation";

export const NAVIGATION_ITEMS: ReadonlyArray<NavigationItem> = [
  {
    path: "overview",
    icon: "mdi:chart-pie",
  },
  {
    path: "pages",
    icon: "mdi:file",
    subItems: ["kanban", "calendar", "chat-room"],
  },
  {
    path: "e-commerce",
    icon: "mdi:shopping",
    subItems: ["product-list", "billing", "invoice"],
  },
  {
    path: "messages",
    icon: "mdi:inbox-full",
  },
  {
    path: "authentication",
    icon: "mdi:lock",
    subItems: ["sign-in", "sign-up", "forgot-password", "reset-password"],
  },
];

export const FOOTER_NAVIGATION_ITEMS: ReadonlyArray<string> = [
  "about",
  "pricing",
  "help",
  "terms-and-conditions",
  "cookies",
  "contact",
];
