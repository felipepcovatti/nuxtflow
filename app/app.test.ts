import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "./app.vue";

describe("app.vue", () => {
  it("renders NuxtLayout and NuxtPage", async () => {
    const wrapper = await mountSuspended(App);

    const layout = wrapper.findComponent({ name: "NuxtLayout" });
    expect(layout.exists()).toBe(true);
    const page = layout.findComponent({ name: "NuxtPage" });
    expect(page.exists()).toBe(true);
  });
});
