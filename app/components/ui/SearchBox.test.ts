import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBox from "./SearchBox.vue";

function mountSearchBox(props?: Record<string, unknown>) {
  return mount(SearchBox, {
    props: {
      modelValue: "",
      ...props,
    },
    global: {
      mocks: {
        $t: (key: string) => (key === "search" ? "Search" : key),
      },
      stubs: {
        Icon: {
          name: "NuxtIcon",
          template: "<span data-test='icon' />",
        },
      },
    },
  });
}

describe("SearchBox", () => {
  it("renders the search input with translated placeholder", async () => {
    const wrapper = mountSearchBox();

    const input = wrapper.get("input");

    expect(input.attributes("placeholder")).toBe("Search");
    expect(wrapper.find(".iconify").exists()).toBe(true);
  });

  it("renders the current model value in the input", async () => {
    const wrapper = mountSearchBox({ modelValue: "Nuxt" });

    const input = wrapper.get("input");

    expect((input.element as HTMLInputElement).value).toBe("Nuxt");
  });

  it("uses the large size variant and custom placeholder when provided", async () => {
    const wrapper = mountSearchBox({
      large: true,
      placeholder: "Search transactions",
    });

    const input = wrapper.get("input");

    expect(wrapper.attributes("class")).toContain("h-10.5");
    expect(wrapper.attributes("class")).toContain("max-w-100");
    expect(input.attributes("placeholder")).toBe("Search transactions");
  });

  it("emits update:modelValue when typing", async () => {
    const wrapper = mountSearchBox();

    const input = wrapper.get("input");

    await input.setValue("Flowbite");

    expect(wrapper.emitted("update:modelValue")?.at(0)).toEqual(["Flowbite"]);
  });
});
