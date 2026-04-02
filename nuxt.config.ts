import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss() as any],
  },
  modules: [
    "reka-ui/nuxt",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxt/test-utils/module",
  ],
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-US",
        file: "en.json",
      },
    ],
  },
  experimental: {
    typedPages: true,
  },
  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
      },
    ],
  },
});
