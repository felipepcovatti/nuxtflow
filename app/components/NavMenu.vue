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

const currentTrigger = ref("");
</script>

<template>
  <div class="w-64 p-3 text-white">
    <NavigationMenuRoot
      orientation="vertical"
      v-model="currentTrigger"
      disable-hover-trigger
      disable-pointer-leave-close
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            class="group flex w-full cursor-pointer items-center justify-between"
          >
            Learn
            <Icon
              name="radix-icons:caret-down"
              class="transition-transform duration-150 ease-in group-data-[state=open]:-rotate-180"
            />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <img class="w-16" src="https://reka-ui.com/logo.svg" />
              <div
                class="mt-4 mb-[7px] text-[18px] leading-[1.2] font-medium text-white"
              >
                Reka UI
              </div>
              <p class="text-mauve4 text-[14px] leading-[1.3]">
                Unstyled, accessible components for Vue.
              </p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  </div>
</template>
