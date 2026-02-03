<script lang="ts" setup>
const searchTerm = ref("");

const { t } = useI18n();

const isMenuPinned = ref(true);
</script>
<template>
  <div class="flex min-h-screen flex-col bg-gray-900 text-white">
    <div class="flex h-16 items-center gap-4 bg-gray-800 px-4">
      <NuxtLink to="/">
        <img src="../assets/img/logo.svg" alt="Logo image" class="w-8" />
      </NuxtLink>
      <button
        @click="isMenuPinned = !isMenuPinned"
        class="icon-button"
        aria-controls="nav-menu"
      >
        <Icon name="mdi-menu" class="text-gray-400" size="1.5rem" />
      </button>
      <div class="relative hidden max-w-100 flex-1 items-center sm:flex">
        <input
          v-model="searchTerm"
          name="search_field"
          class="h-10.5 w-full rounded-lg border border-gray-600 bg-gray-700 pr-4 pl-11 text-sm text-gray-400"
          :placeholder="t('search')"
        />
        <Icon
          name="mdi:magnify"
          class="absolute left-4 text-gray-400"
          size="1.25rem"
        />
      </div>
      <div class="ml-auto flex items-center gap-3">
        <div class="sm:hidden">
          <button class="icon-button">
            <Icon name="mdi:magnify" class="text-gray-400" size="1.75rem" />
          </button>
        </div>
        <button class="icon-button">
          <Icon name="mdi:bell" class="text-gray-400" size="1.5rem" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:apps" class="text-gray-400" size="1.5rem" />
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
    <div class="flex flex-1">
      <NavMenu id="nav-menu" v-model:pinned="isMenuPinned" />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
<style scoped>
@reference "@/assets/css/main.css";
.icon-button {
  @apply flex cursor-pointer items-center rounded-full p-2 focus:bg-gray-700/60;
}
</style>
<i18n lang="json">
{
  "en": {
    "search": "Search"
  }
}
</i18n>
