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
    <div class="grid flex-1 grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)]">
      <LayoutNavigationSidebar
        id="navigation-sidebar"
        v-model:pinned="isNavigationSidebarPinned"
      />
      <div class="grid grid-rows-[1fr_auto] gap-4 p-4">
        <main class="@container">
          <slot />
        </main>
      </div>
    </div>
    <LayoutNavigationDrawer
      id="navigation-drawer"
      v-model:open="isNavigationDrawerOpen"
    />
  </div>
</template>
