<script lang="ts" setup>
const searchTerm = ref("");

const { t } = useI18n();

const isMenuOpen = ref(true);
</script>
<template>
  <div class="flex min-h-screen flex-col bg-gray-900">
    <div class="flex min-h-16 items-center gap-4 bg-gray-800 px-4 py-3">
      <img src="../assets/img/logo.svg" alt="Logo image" class="w-8" />
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="flex cursor-pointer items-center p-2"
      >
        <Icon name="mdi-menu" class="text-gray-400" size="1.5rem" />
      </button>
      <div class="relative flex max-w-100 flex-1 items-center">
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
        <button class="flex cursor-pointer items-center p-2">
          <Icon name="mdi:bell" class="text-gray-400" size="1.5rem" />
        </button>
        <button class="flex cursor-pointer items-center p-2">
          <Icon name="mdi:apps" class="text-gray-400" size="1.5rem" />
        </button>
        <button class="flex cursor-pointer items-center p-2">
          <img
            src="https://avatars.githubusercontent.com/u/22751969"
            alt="Profile picture"
            class="w-8 rounded-full"
          />
        </button>
      </div>
    </div>
    <div class="flex flex-1">
      <div
        :data-state="isMenuOpen ? 'open' : 'closed'"
        class="bg-gray-800 transition-all data-[state=closed]:w-12 data-[state=closed]:overflow-x-hidden data-[state=open]:w-64"
      >
        <NavMenu />
      </div>
      {{ isMenuOpen }}
      <slot />
    </div>
  </div>
</template>
<i18n lang="json">
{
  "en": {
    "search": "Search"
  }
}
</i18n>
