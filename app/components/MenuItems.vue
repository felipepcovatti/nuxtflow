<script setup lang="ts">
import { MENU_ITEMS } from "~/constants/menu";

defineEmits(["select"]);

const { t } = useI18n();

const { getItemState, expandedItems, collapseAllItems, expandActiveItem } =
  useMenu();

defineExpose({
  collapseAllItems,
  expandActiveItem,
});
</script>

<template>
  <AccordionRoot
    as="nav"
    type="multiple"
    v-model="expandedItems"
    class="flex w-full flex-col gap-2 p-3"
  >
    <div
      v-for="item in MENU_ITEMS"
      :key="item.path"
      class="group/item"
      :data-state="getItemState(item)"
    >
      <AccordionItem
        v-if="item.subItems"
        :value="item.path"
        class="group w-ful"
      >
        <AccordionHeader
          class="menu-item group-data-[state=open]:bg-transparent!"
          as-child
        >
          <AccordionTrigger>
            <Icon :name="item.icon" class="item-icon" />
            {{ t(`itemPath.${item.path}`) }}
            <Icon
              name="radix-icons:caret-down"
              size="1.25rem"
              class="ml-auto transition-transform duration-150 ease-in group-data-[state=open]:-rotate-180"
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
          class="menu-subitems flex flex-col gap-1 overflow-hidden pt-1 pb-2"
        >
          <NuxtLink
            v-for="subItem in item.subItems"
            :key="subItem"
            :to="`/${item.path}/${subItem}`"
            active-class="bg-gray-700"
            class="flex w-full rounded-lg py-1.5 pr-2 pl-9 whitespace-nowrap hover:bg-gray-900"
            @click="$emit('select')"
          >
            {{ t(`subitemPath.${subItem}`) }}
          </NuxtLink>
        </AccordionContent>
      </AccordionItem>
      <NuxtLink
        v-else
        :to="`/${item.path}`"
        class="menu-item"
        @click="$emit('select')"
      >
        <Icon :name="item.icon" class="item-icon" />
        {{ t(`itemPath.${item.path}`) }}
      </NuxtLink>
    </div>
  </AccordionRoot>
</template>
<style scoped>
@reference "@/assets/css/main.css";
.menu-item {
  @apply flex min-h-9 w-full cursor-pointer items-center gap-3 overflow-x-hidden rounded-lg px-2 py-1.5 whitespace-nowrap group-data-[state=active]/item:bg-gray-700 hover:bg-gray-900;
}
.item-icon {
  @apply flex-none text-gray-400 group-data-[state=active]/item:text-white;
}

.menu-subitems[data-state="open"] {
  animation: slideDownSubitems 200ms ease-out;
}
.menu-subitems[data-state="closed"] {
  animation: slideUpSubitems 150ms ease-out;
}

@keyframes slideDownSubitems {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUpSubitems {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>

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
      "chat-room": "Chat Room",
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
