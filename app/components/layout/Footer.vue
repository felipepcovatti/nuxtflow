<script lang="ts" setup>
import { FOOTER_NAVIGATION_ITEMS } from "~/constants/navigation";
</script>
<template>
  <footer class="card justify-between">
    <nav>
      <ul class="flex flex-wrap gap-x-4 gap-y-2">
        <li v-for="item in FOOTER_NAVIGATION_ITEMS" :key="item">
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
</template>
