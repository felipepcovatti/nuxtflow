<script lang="ts" setup>
import SearchBox from "../ui/SearchBox.vue";

defineEmits<{
  toggleNavigationSidebarPin: [];
  openNavigationDrawer: [];
}>();

const searchTerm = ref("");
</script>

<template>
  <div
    class="sticky top-0 z-1 flex h-(--header-height) items-center gap-3 bg-gray-800 px-4"
  >
    <div class="flex flex-1 items-center gap-3">
      <div class="hidden sm:flex">
        <button
          @click="$emit('toggleNavigationSidebarPin')"
          class="icon-button"
          aria-controls="navigation-sidebar"
        >
          <Icon name="mdi-menu" size="1.5rem" />
        </button>
      </div>
      <div class="flex sm:hidden">
        <button
          @click="$emit('openNavigationDrawer')"
          class="icon-button"
          aria-controls="navigation-drawer"
        >
          <Icon name="mdi-menu" size="1.5rem" />
        </button>
      </div>
      <NuxtLink to="/" class="icon-button">
        <img src="~/assets/img/logo.svg" alt="Logo image" class="w-8" />
      </NuxtLink>
      <SearchBox v-model="searchTerm" large class="hidden sm:block" />
    </div>
    <div class="flex items-center gap-3">
      <div class="sm:hidden">
        <button class="icon-button">
          <Icon name="mdi:magnify" size="1.75rem" />
        </button>
      </div>
      <button class="icon-button">
        <Icon name="mdi:bell" size="1.5rem" />
      </button>
      <button class="icon-button">
        <Icon name="mdi:apps" size="1.5rem" />
      </button>
      <button class="icon-button">
        <img
          src="https://avatars.githubusercontent.com/u/22751969"
          alt="Profile picture"
          class="w-8 rounded-full"
        />
      </button>
    </div>
  </div>
</template>
