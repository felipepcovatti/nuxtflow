<script setup lang="ts">
import { ref, computed } from "vue";
definePageMeta({
  title: "NuxtFlow — Welcome",
  layout: "plain",
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-900 p-6">
    <div class="w-full max-w-6xl">
      <div class="flex flex-col gap-2">
        <h1 class="text-5xl font-semibold text-white md:text-6xl">NuxtFlow</h1>
        <p class="mt-2 text-lg text-gray-400">
          A dashboard demo project, built using Nuxt 4, Tailwind 4, and Reka UI.
        </p>
        <div class="mt-8 flex gap-6">
          <NuxtLink
            to="/overview"
            class="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            aria-label="View project live"
          >
            View project live
          </NuxtLink>
          <a
            href="https://github.com/felipepcovatti/flowbite-homepage-vue"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm text-blue-400 hover:underline"
            aria-label="Project repository (opens in a new tab)"
          >
            Source code
            <Icon name="mdi:open-in-new" class="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>

      <div class="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <UiCard class="p-8" title="Project overview">
          <div>
            <h3 class="text-sm">Description</h3>
            <p class="mt-2 text-gray-300">
              NuxtFlow consists of a demo dashboard web-application created for
              learning and portfolio purposes. It was based on a
              <a
                href="https://www.figma.com/design/BwJpLnMEFPsqLDaSgylB0V/flowbite-pro-figma-v2.10.0?node-id=2465-181397&p=f&t=7rafpIpQsOemlXRg-0"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 underline"
                >publicly available Figma file</a
              >
              (as of May 2026) owned by Flowbite - with usage permission kindly
              granted for this use case.
            </p>
          </div>

          <div>
            <h3 class="text-sm text-gray-400">Scope</h3>
            <p class="mt-2 text-gray-300">
              The current implementation focuses on the dark theme version of
              the Homepage (Overview), with some adaptations that seemed
              appropriate, and with some feature simplifications and omissions,
              for the sake of practicality and development time.
            </p>
          </div>
          <div>
            <h3 class="text-sm text-gray-400">Development period</h3>
            <p class="mt-2 text-gray-300">From January 28 to May 1, 2026.</p>
          </div>
        </UiCard>

        <UiCard class="p-8" title="Tools and technologies">
          <div>
            <h3 class="text-sm text-gray-400">Stack</h3>
            <p class="mt-2 text-gray-300">
              This project was built using the Nuxt Vue framework, with
              TypeScript and Tailwind CSS. Other libraries used include Reka UI
              for accessible UI components, Unovis for charts and date-fns for
              date manipulation.
            </p>
          </div>
          <div>
            <h3 class="text-sm text-gray-400">Testing</h3>
            <p class="mt-2 text-gray-300">
              Automated tests were implemented using Vitest and other auxiliary
              packages. They cover utility functions, component rendering and
              wiring, and basic interactions.
            </p>
          </div>
          <div>
            <h3 class="text-sm text-gray-400">Artificial Intelligence (AI)</h3>
            <p class="mt-2 text-gray-300">
              AI tools were used to assist and optimize the development process,
              helping with code review, code generation, mocking, test cases
              creation, and decision making, in general. These tools include
              Copilot, Codex, Gemini, ChatGPT, and Claude.
            </p>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>
