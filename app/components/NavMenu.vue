<script setup lang="ts">
import {
  AccordionRoot,
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
    <AccordionRoot type="multiple">
      <div class="flex flex-col gap-2">
        <div v-for="item in items" :key="item.path">
          <AccordionItem
            v-if="item.subItems"
            :value="item.path"
            class="group w-ful"
          >
            <AccordionHeader
              class="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-900"
              as-child
            >
              <AccordionTrigger>
                <Icon :name="item.icon" class="text-gray-400" />
                {{ t(`itemPath.${item.path}`) }}
                <Icon
                  name="radix-icons:caret-down"
                  size="1.25rem"
                  class="ml-auto transition-transform duration-150 ease-in group-data-[state=open]:-rotate-180"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="pt-2 pl-7">
              <NuxtLink
                v-for="subItem in item.subItems"
                :to="`${item.path}/${subItem}`"
                active-class="bg-gray-700!"
                class="flex w-full p-2 hover:bg-gray-900"
              >
                {{ t(`subitemPath.${subItem}`) }}
              </NuxtLink>
            </AccordionContent>
          </AccordionItem>
          <NuxtLink
            v-else
            :to="item.path"
            active-class="bg-gray-700!"
            class="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-900"
          >
            <Icon :name="item.icon" class="text-gray-400" />
            {{ t(`itemPath.${item.path}`) }}
          </NuxtLink>
        </div>
      </div>
    </AccordionRoot>
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
