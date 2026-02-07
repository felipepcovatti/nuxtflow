<script lang="ts" setup>
const searchTerm = ref("");

const { t } = useI18n();

const isDesktopMenuPinned = ref(true);

const isMobileMenuOpen = ref(false);
</script>
<template>
  <div class="flex min-h-dvh min-w-xs flex-col bg-gray-900 text-white">
    <MainHeader
      @toggle-desktop-menu-pin="isDesktopMenuPinned = !isDesktopMenuPinned"
      @open-mobile-menu="isMobileMenuOpen = true"
    />
    <div class="flex flex-1">
      <DesktopMenu id="desktop-menu" v-model:pinned="isDesktopMenuPinned" />
      <main class="p-4">
        <slot />
      </main>
    </div>
    <MobileMenu id="mobile-menu" v-model:open="isMobileMenuOpen" />
  </div>
</template>
