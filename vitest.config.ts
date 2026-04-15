import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    env: {
      TZ: "UTC",
    },
    exclude: ["**/node_modules/**", "**\/.git/**", "**/.nuxt/**"],
  },
});
