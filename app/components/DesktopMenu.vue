<script setup lang="ts">
import type MenuItems from "./MenuItems.vue";

const isExpanded = ref(true);

const isPinned = defineModel<boolean>("pinned", { required: true });

const menuItemsRef =
  useTemplateRef<InstanceType<typeof MenuItems>>("menu-items");

const { stop: cancelExpandActive, start: expandActive } = useTimeoutFn(
  () => menuItemsRef.value?.expandActiveItem(),
  () => (isPinned.value ? 0 : 200),
  { immediate: false },
);

watch(isExpanded, (expanded) => {
  if (expanded) {
    expandActive();
  } else {
    cancelExpandActive();
    menuItemsRef.value?.collapseAllItems();
  }
});

watch(isPinned, (fixed) => {
  isExpanded.value = fixed;
});
</script>

<template>
  <div
    :data-expanded="isExpanded"
    ref="menu"
    @mouseleave="!isPinned && (isExpanded = false)"
    @mouseenter="!isPinned && (isExpanded = true)"
    class="hidden w-14 overflow-x-hidden bg-gray-800 text-white transition-[width] duration-200 ease-in-out hover:delay-200 data-[expanded=true]:w-64 sm:flex pointer-fine:w-20"
  >
    <MenuItems ref="menu-items" />
  </div>
</template>
