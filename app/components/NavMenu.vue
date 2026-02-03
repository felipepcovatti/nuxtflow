<script setup lang="ts">
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

const pinned = defineModel<boolean>("pinned", { required: true });

const { t } = useI18n();

const route = useRoute();

function getItemState(item: MenuItem): "active" | "inactive" {
  if (item.subItems) {
    return item.subItems.some((item) => route.path.includes(item))
      ? "active"
      : "inactive";
  }
  return route.path.includes(item.path) ? "active" : "inactive";
}

const expandedItems = ref<string[]>([]);

const isExpanded = ref(true);

function collapseAllItems() {
  expandedItems.value = [];
}

watch(pinned, (pinned) => {
  isExpanded.value = pinned;
});

const activeItem = computed(() =>
  items.find((item) => getItemState(item) === "active"),
);

watch(isExpanded, (expanded) => {
  if (!expanded) {
    collapseAllItems();
  } else {
    setTimeout(
      () => {
        if (activeItem.value?.subItems && isExpanded.value) {
          expandedItems.value = [activeItem.value.path];
        }
      },
      pinned.value ? 0 : 200,
    );
  }
});

const menu = useTemplateRef("menu");

const { focused } = useFocusWithin(menu);

watch(focused, (focused) => {
  if (!pinned.value) {
    isExpanded.value = focused;
  }
});
</script>

<template>
  <div
    :data-expanded="isExpanded"
    ref="menu"
    @mouseleave="!pinned && (isExpanded = false)"
    @mouseenter="!pinned && (isExpanded = true)"
    class="group fixed top-16 bottom-0 w-0 overflow-x-hidden bg-gray-800 text-white transition-[width] duration-200 ease-in-out hover:delay-200 data-[expanded=true]:w-64 sm:static sm:w-14"
  >
    <AccordionRoot type="multiple" v-model="expandedItems">
      <div class="flex flex-col gap-2 p-3">
        <div
          v-for="item in items"
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
                :to="`/${item.path}/${subItem}`"
                active-class="bg-gray-700"
                class="flex w-full rounded-lg py-1.5 pr-2 pl-9 whitespace-nowrap hover:bg-gray-900"
              >
                {{ t(`subitemPath.${subItem}`) }}
              </NuxtLink>
            </AccordionContent>
          </AccordionItem>
          <NuxtLink v-else :to="`/${item.path}`" class="menu-item">
            <Icon :name="item.icon" class="item-icon" />
            {{ t(`itemPath.${item.path}`) }}
          </NuxtLink>
        </div>
      </div>
    </AccordionRoot>
  </div>
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
  animation: slideUpSubitems 200ms ease-out;
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
