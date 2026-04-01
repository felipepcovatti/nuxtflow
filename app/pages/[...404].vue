<template>
  <UiCard :title="$route.path" subtitle="Not implemented" class="h-full">
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

<script setup lang="ts">
const router = useRouter();

function goBack() {
  if (window.history.state.back) {
    router.back();
  } else {
    navigateTo("/");
  }
}
</script>
