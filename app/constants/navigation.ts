export interface NavigationItem {
  path: string;
  icon: string;
  subItems?: string[];
}

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
