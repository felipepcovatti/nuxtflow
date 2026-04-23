import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import TransactionStatus from "./TransactionStatus.vue";
import type { TransactionStatus as TransactionStatusValue } from "~/types/transactions";

const statuses: Array<{
  status: TransactionStatusValue;
  label: string;
}> = [
  {
    status: "completed",
    label: "Complete",
  },
  {
    status: "pending",
    label: "Pending",
  },
  {
    status: "in_progress",
    label: "In progress",
  },
  {
    status: "cancelled",
    label: "Cancelled",
  },
];

describe("TransactionStatus", () => {
  it.each(statuses)(
    'renders the "$status" status with the translated label',
    async ({ status, label }) => {
      const wrapper = await mountSuspended(TransactionStatus, {
        props: {
          status,
        },
      });

      expect(wrapper.attributes("data-status")).toBe(status);
      expect(wrapper.text()).toContain(label);
    },
  );

  it("defines the status color modifiers in the class list", async () => {
    const wrapper = await mountSuspended(TransactionStatus, {
      props: {
        status: "completed",
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        "data-[status=completed]:bg-green-900",
        "data-[status=completed]:text-green-300",
        "data-[status=pending]:bg-yellow-900",
        "data-[status=pending]:text-yellow-300",
        "data-[status=in\\_progress]:bg-pink-900",
        "data-[status=in\\_progress]:text-pink-300",
        "data-[status=cancelled]:bg-red-900",
        "data-[status=cancelled]:text-red-300",
      ]),
    );
  });
});
