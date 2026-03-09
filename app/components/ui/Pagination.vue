<script setup lang="ts">
const page = defineModel<number>("page", { required: true });

const props = defineProps<{
  total: number;
  perPage: number;
}>();

const from = computed(() => (page.value - 1) * props.perPage + 1);
const to = computed(() => Math.min(page.value * props.perPage, props.total));
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="text-sm">
      <i18n-t keypath="pagination.itemsInfo">
        <template #from>
          <b class="text-white">{{ from }}</b>
        </template>
        <template #to>
          <b class="text-white">{{ to }}</b>
        </template>
        <template #total>
          <b class="text-white">{{ total }}</b>
        </template>
      </i18n-t>
    </div>

    <PaginationRoot
      :total="total"
      :items-per-page="perPage"
      :sibling-count="0"
      :show-edges="true"
      v-model:page="page"
      class="flex items-center select-none"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex divide-x divide-gray-700 overflow-clip rounded border border-gray-700"
      >
        <PaginationPrev :aria-label="$t('pagination.previous')">
          <Icon name="lucide:chevron-left" class="size-4" />
        </PaginationPrev>

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            :class="{ active: item.value === page }"
          >
            {{ item.value }}
          </PaginationListItem>

          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
            class="flex size-9 items-end justify-center p-2"
          >
            <Icon name="lucide:more-horizontal" class="size-4" />
          </PaginationEllipsis>
        </template>

        <PaginationNext :aria-label="$t('pagination.next')">
          <Icon name="lucide:chevron-right" class="size-4" />
        </PaginationNext>
      </PaginationList>
    </PaginationRoot>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

button {
  @apply flex h-9 min-w-9 cursor-pointer items-center justify-center bg-gray-800 px-2 text-sm text-gray-400 transition-all hover:bg-gray-900 focus-visible:bg-gray-900;
  @apply disabled:cursor-not-allowed disabled:text-gray-600 disabled:hover:bg-transparent;

  &.active {
    /* Using !important (via Tailwind's !) or specific ordering to ensure active wins */
    @apply bg-gray-700 font-bold text-white shadow-sm ring-1 ring-gray-600;
  }
}
</style>
