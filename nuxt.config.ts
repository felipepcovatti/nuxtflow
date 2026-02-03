import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "reka-ui/nuxt",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@vueuse/nuxt",
  ],
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-US",
      },
    ],
  },
  experimental: {
    typedPages: true,
  },
});
