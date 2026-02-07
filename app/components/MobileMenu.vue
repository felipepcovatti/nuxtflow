<script setup lang="ts">
import type MenuItems from "./MenuItems.vue";

const isOpen = defineModel<boolean>("open", { required: true });

const menuItemsRef =
  useTemplateRef<InstanceType<typeof MenuItems>>("menu-items");

whenever(isOpen, () => menuItemsRef.value?.expandActiveItem(), {
  flush: "post",
});
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <div class="sm:hidden">
      <DialogOverlay
        class="overlay data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-30 bg-black/30"
      />
      <DialogContent
        class="content data-[state=open]:animate-slide-from-left data-[state=closed]:animate-slide-to-left fixed top-0 bottom-0 left-0 z-31 w-64 bg-gray-800"
      >
        <DialogClose>
          <Icon name="mdi-close" />
        </DialogClose>
        <MenuItems ref="menu-items" />
      </DialogContent>
    </div>
  </DialogRoot>
</template>
