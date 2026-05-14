<script lang="ts" setup>
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
          class="icon-button"
          aria-controls="navigation-sidebar"
          @click="$emit('toggleNavigationSidebarPin')"
        >
          <Icon name="mdi-menu" size="1.5rem" />
        </button>
      </div>
      <div class="flex sm:hidden">
        <button
          class="icon-button"
          aria-controls="navigation-drawer"
          @click="$emit('openNavigationDrawer')"
        >
          <Icon name="mdi-menu" size="1.5rem" />
        </button>
      </div>
      <NuxtLink to="/" class="icon-button">
        <img src="~/assets/img/logo.svg" :alt="$t('nuxtLogo')" class="w-8" />
      </NuxtLink>
      <UiSearchBox v-model="searchTerm" large class="hidden sm:flex" />
    </div>
    <div class="flex items-center gap-3">
      <div class="sm:hidden">
        <button class="icon-button" :aria-label="$t('search')">
          <Icon name="mdi:magnify" size="1.75rem" />
        </button>
      </div>
      <button class="icon-button" :aria-label="$t('notifications')">
        <Icon name="mdi:bell" size="1.5rem" />
      </button>
      <button class="icon-button" :aria-label="$t('apps')">
        <Icon name="mdi:apps" size="1.5rem" />
      </button>
      <button class="icon-button" :aria-label="$t('account')">
        <img
          src="https://avatars.githubusercontent.com/u/22751969"
          :alt="$t('profilePicture')"
          class="w-8 rounded-full"
        />
      </button>
    </div>
  </div>
</template>
