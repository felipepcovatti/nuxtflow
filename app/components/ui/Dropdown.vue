<script setup lang="ts">
export interface DropdownItem {
  label: string;
  icon: string;
  action: () => void;
}

defineProps<{
  items: DropdownItem[];
}>();
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot>
        <button class="icon-button icon-button--outline">
          <Icon name="mdi:dots-vertical" size="1.25rem" />
        </button>
      </slot>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="z-100 min-w-44 rounded-lg border border-gray-700 bg-gray-900 p-1 shadow-xl"
        :side-offset="6"
        :collisionPadding="32"
      >
        <DropdownMenuItem
          v-for="action in items"
          :key="action.label"
          @select="action.action()"
          class="group data-highlighted:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-300 data-highlighted:text-white"
        >
          <Icon v-if="action.icon" :name="action.icon" />
          <span>{{ action.label }}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
