<script setup lang="ts">
const { goBack } = useHistory();
</script>

<template>
  <UiCard :title="$route.path" :subtitle="$t('notImplemented')" class="h-full">
    <div class="flex flex-col justify-center gap-6 p-4">
      <p class="text-center">
        {{ $t("onlyOverviewAvailable") }}
      </p>
      <button class="button self-center" @click="goBack">
        <Icon name="mdi:arrow-left" size="1.25rem" />
        {{ $t("goBack") }}
      </button>
    </div>
  </UiCard>
</template>
