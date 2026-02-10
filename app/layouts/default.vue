<script lang="ts" setup>
const isNavigationSidebarPinned = ref(true);

const isNavigationDrawerOpen = ref(false);
</script>
<template>
  <div class="flex min-h-dvh min-w-xs flex-col bg-gray-900 text-white">
    <LayoutHeader
      @toggle-navigation-sidebar-pin="
        isNavigationSidebarPinned = !isNavigationSidebarPinned
      "
      @open-navigation-drawer="isNavigationDrawerOpen = true"
    />
    <div class="flex flex-1">
      <LayoutNavigationSidebar
        id="navigation-sidebar"
        v-model:pinned="isNavigationSidebarPinned"
      />
      <main class="p-4">
        <slot />
      </main>
    </div>
    <LayoutNavigationDrawer
      id="navigation-drawer"
      v-model:open="isNavigationDrawerOpen"
    />
  </div>
</template>
