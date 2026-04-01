<script lang="ts" setup>
import { FOOTER_NAVIGATION_ITEMS } from "~/constants/navigation";
</script>
<template>
  <UiCard>
    <footer class="flex justify-between">
      <nav>
        <ul class="flex flex-wrap gap-x-4 gap-y-2">
          <li v-for="item in FOOTER_NAVIGATION_ITEMS">
            <NuxtLink
              :to="`/${item}`"
              class="p-2 font-semibold text-white underline"
            >
              {{ $t(`footerNavigationItems.${item}`) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </footer>
  </UiCard>
</template>
