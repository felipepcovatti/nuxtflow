<script setup lang="ts">
import type LayoutNavigationItems from "~/components/layout/navigation/Items.vue";
import { breakpointsTailwind } from "@vueuse/core";

const isOpen = defineModel<boolean>("open", { required: true });

const navigationItems =
  useTemplateRef<InstanceType<typeof LayoutNavigationItems>>(
    "navigation-items",
  );

whenever(isOpen, () => navigationItems.value?.expandActiveItem(), {
  flush: "post",
});

const route = useRoute();

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);

const { greaterOrEqual } = useBreakpoints(breakpointsTailwind);

whenever(greaterOrEqual("sm"), () => {
  isOpen.value = false;
});

const { t } = useI18n();
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogOverlay
      class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-30 bg-black/30"
    />
    <DialogContent
      class="data-[state=open]:animate-slide-from-left data-[state=closed]:animate-slide-to-left fixed top-0 bottom-0 left-0 z-31 flex w-64 flex-col items-start bg-gray-800"
      :aria-describedby="undefined"
    >
      <VisuallyHidden asChild>
        <DialogTitle>{{ t("navigation") }}</DialogTitle>
      </VisuallyHidden>
      <div class="flex h-(--header-height) shrink-0 items-center gap-3 px-4">
        <DialogClose class="icon-button">
          <Icon name="mdi-close" size="1.25rem" />
        </DialogClose>
        <img src="~/assets/img/logo.svg" alt="Logo image" class="w-8" />
      </div>
      <LayoutNavigationItems ref="navigation-items" @select="isOpen = false" />
    </DialogContent>
  </DialogRoot>
</template>
<i18n lang="json">
{
  "en": {
    "navigation": "Navigation"
  }
}
</i18n>
