<script setup lang="ts">
// Reka UI auto-imported
const page = defineModel<number>("page", { required: true });

const props = defineProps<{
  total: number;
  perPage: number;
}>();

// Cálculos para o indicador "Showing X-Y of Z"
const from = computed(() => (page.value - 1) * props.perPage + 1);
const to = computed(() => Math.min(page.value * props.perPage, props.total));
</script>

<template>
  <div
    class="flex flex-col items-center justify-between gap-4 py-3 sm:flex-row"
  >
    <div class="text-sm text-gray-500">
      Showing
      <span class="font-medium text-gray-900">{{ from }}</span>
      to
      <span class="font-medium text-gray-900">{{ to }}</span>
      of
      <span class="font-medium text-gray-900">{{ total }}</span>
      results
    </div>

    <PaginationRoot
      :total="total"
      :items-per-page="perPage"
      :sibling-count="1"
      :show-edges="true"
      v-model:page="page"
      class="flex items-center select-none"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex divide-x divide-gray-700 overflow-clip rounded border border-gray-700"
      >
        <PaginationPrev aria-label="Anterior">
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

        <PaginationNext aria-label="Próxima">
          <Icon name="lucide:chevron-right" class="size-4" />
        </PaginationNext>
      </PaginationList>
    </PaginationRoot>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

button {
  @apply flex h-9 min-w-9 cursor-pointer items-center justify-center bg-gray-800 px-2 text-sm text-gray-400 transition-all hover:bg-gray-900 disabled:cursor-not-allowed disabled:hover:bg-transparent;

  &.active {
    @apply bg-gray-700 font-bold text-white shadow-sm;
  }
}
</style>
