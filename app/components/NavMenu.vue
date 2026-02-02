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

const open = defineModel<boolean>("open", { required: true });

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

function collapseAll() {
  expandedItems.value = [];
}

watch(open, (isOpen) => {
  if (!isOpen) {
    collapseAll();
  }
});
</script>

<template>
  <div
    :data-expanded="open"
    @mouseleave="!open && collapseAll()"
    class="group fixed top-16 bottom-0 w-0 overflow-x-hidden bg-gray-800 text-white transition-[width] ease-in-out focus-within:w-64 data-[expanded=true]:w-64 sm:static sm:w-14 hover:sm:w-64"
  >
    <AccordionRoot type="multiple" v-model="expandedItems">
      <div class="flex flex-col gap-2 p-3">
        <div v-for="item in items" :key="item.path">
          <AccordionItem
            v-if="item.subItems"
            :value="item.path"
            class="group w-ful"
          >
            <AccordionHeader class="menu-item" as-child>
              <AccordionTrigger>
                <Icon
                  :name="item.icon"
                  :data-state="getItemState(item)"
                  class="item-icon"
                />
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
                active-class="bg-gray-700"
                class="flex w-full p-2 hover:bg-gray-900"
              >
                {{ t(`subitemPath.${subItem}`) }}
              </NuxtLink>
            </AccordionContent>
          </AccordionItem>
          <NuxtLink
            v-else
            :to="item.path"
            active-class="bg-gray-700"
            class="menu-item"
          >
            <Icon
              :name="item.icon"
              :data-state="getItemState(item)"
              class="item-icon"
            />
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
  @apply flex min-h-9 w-full cursor-pointer items-center gap-3 overflow-x-hidden rounded-lg px-2 py-1.5 whitespace-nowrap hover:bg-gray-900;
}
.item-icon {
  @apply flex-none text-gray-400 data-[state=active]:text-white;
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
