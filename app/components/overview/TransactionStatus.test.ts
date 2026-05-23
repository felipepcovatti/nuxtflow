import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import TransactionStatus from "./TransactionStatus.vue";
import type { TransactionStatus as Status } from "~/types/transactions";

describe("TransactionStatus", () => {
  const statuses: {
    status: Status;
    label: string;
    classes: [string, string];
  }[] = [
    {
      status: "completed",
      label: "Complete",
      classes: ["bg-green-900", "text-green-300"],
    },
    {
      status: "pending",
      label: "Pending",
      classes: ["bg-yellow-900", "text-yellow-300"],
    },
    {
      status: "in_progress",
      label: "In progress",
      classes: ["bg-pink-900", "text-pink-300"],
    },
    {
      status: "cancelled",
      label: "Cancelled",
      classes: ["bg-red-900", "text-red-300"],
    },
  ];
  it.each(statuses)(
    'renders the "$status" status with the translated label and classes',
    async ({ status, label, classes }) => {
      const wrapper = await mountSuspended(TransactionStatus, {
        props: {
          status,
        },
      });

      expect(wrapper.attributes("data-status")).toBe(status);
      expect(wrapper.text()).toContain(label);
      expect(wrapper.classes()).toEqual(expect.arrayContaining(classes));
    },
  );
});
