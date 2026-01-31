<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "reka-ui";
import { ref } from "vue";

interface MenuItem {
  path: string;
  icon: string;
  subItems?: string[];
}

const items: ReadonlyArray<MenuItem> = [
  {
    path: "overview",
    icon: "mdi:chart-pie",
  },
  {
    path: "pages",
    icon: "mdi:file",
    subItems: ["kanban", "calendar", "chatRoom"],
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

const { t } = useI18n();

const route = useRoute();

function isActive(item: MenuItem) {
  if (item.subItems) {
    return item.subItems.some((item) => route.path.includes(item));
  }
  return route.path.includes(item.path);
}
</script>

<template>
  <div class="w-64 p-3 text-white">
    <NavigationMenuRoot
      orientation="vertical"
      disable-hover-trigger
      disable-pointer-leave-close
    >
      <NavigationMenuList class="flex flex-col gap-2">
        <NavigationMenuItem
          v-for="item in items"
          :key="item.path"
          class="overflow-clip rounded-lg"
        >
          <NavigationMenuTrigger
            v-if="item.subItems"
            class="group w-full cursor-pointer p-2"
          >
            <div class="flex w-full items-center gap-3">
              <Icon :name="item.icon" />
              {{ t(`itemPath.${item.path}`) }}
              <Icon
                name="radix-icons:caret-down"
                size="1.25rem"
                class="ml-auto transition-transform duration-150 ease-in group-data-[state=open]:-rotate-180"
              />
            </div>
            <NavigationMenuContent class="pt-2 pl-7">
              <NavigationMenuLink
                v-for="subItem in item.subItems"
                :key="subItem"
                as-child
                :active="isActive(item)"
              >
                <NuxtLink
                  :to="`${item.path}/${subItem}`"
                  class="flex w-full p-2"
                >
                  {{ t(`subitemPath.${subItem}`) }}
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
          <NavigationMenuLink v-else as-child :active="isActive(item)">
            <NuxtLink
              :to="item.path"
              class="flex w-full items-center gap-3 p-2 data-active:bg-gray-700"
            >
              <Icon :name="item.icon" />
              {{ t(`itemPath.${item.path}`) }}
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  </div>
</template>
<i18n lang="json">
{
  "en": {
    "itemPath": {
      "overview": "Overview",
      "pages": "Pages",
      "e-commerce": "E-commerce",
      "messages": "Messages",
      "authentication": "Authentication"
    },
    "subitemPath": {
      "kanban": "Kanban",
      "calendar": "Calendar",
      "chatRoom": "Chat Room",
      "product-list": "Product List",
      "billing": "Billing",
      "invoice": "Invoice",
      "sign-in": "Sign In",
      "sign-up": "Sign Up",
      "forgot-password": "Forgot Password",
      "reset-password": "Reset Password"
    }
  }
}
</i18n>
