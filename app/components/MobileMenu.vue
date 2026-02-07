<script setup lang="ts">
import type MenuItems from "./MenuItems.vue";
const isOpen = defineModel<boolean>("open", { required: true });

const menuItemsRef =
  useTemplateRef<InstanceType<typeof MenuItems>>("menu-items");

whenever(isOpen, () => menuItemsRef.value?.expandActiveItem(), {
  flush: "post",
});

const route = useRoute();
watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <div class="sm:hidden">
      <DialogOverlay
        class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-30 bg-black/30"
      />
      <DialogContent
        class="data-[state=open]:animate-slide-from-left data-[state=closed]:animate-slide-to-left fixed top-0 bottom-0 left-0 z-31 flex w-64 flex-col items-start bg-gray-800"
      >
        <DialogClose
          class="mx-4 my-3 flex size-10 cursor-pointer items-center justify-center"
        >
          <Icon name="mdi-close" size="1.25rem" />
        </DialogClose>
        <MenuItems ref="menu-items" @select="isOpen = false" />
      </DialogContent>
    </div>
  </DialogRoot>
</template>
