<script setup lang="ts">
import type LayoutNavigationItems from "~/components/layout/navigation/Items.vue";

const isPinned = defineModel<boolean>("pinned", { required: true });

const isExpanded = ref(isPinned.value);

const navigationItemsRef =
  useTemplateRef<InstanceType<typeof LayoutNavigationItems>>(
    "navigation-items",
  );

const { stop: cancelExpandActive, start: expandActive } = useTimeoutFn(
  () => navigationItemsRef.value?.expandActiveItem(),
  () => (isPinned.value ? 0 : 200),
  { immediate: false },
);

watch(isExpanded, (expanded) => {
  if (expanded) {
    expandActive();
  } else {
    cancelExpandActive();
    navigationItemsRef.value?.collapseAllItems();
  }
});

watch(isPinned, (fixed) => {
  isExpanded.value = fixed;
});
</script>

<template>
  <div
    :data-expanded="isExpanded"
    @mouseleave="!isPinned && (isExpanded = false)"
    @mouseenter="!isPinned && (isExpanded = true)"
    class="sticky top-(--header-height) hidden h-[calc(100vh-var(--header-height))] w-14 overflow-y-auto bg-gray-800 text-white transition-[width] duration-200 ease-in-out hover:delay-200 data-[expanded=true]:w-64 sm:block"
  >
    <LayoutNavigationItems ref="navigation-items" />
  </div>
</template>
