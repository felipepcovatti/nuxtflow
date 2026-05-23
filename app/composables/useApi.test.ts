import { mockNuxtImport, registerEndpoint } from "@nuxt/test-utils/runtime";
import { getHeaders, type RequestHeaders } from "h3";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useApi } from "./useApi";

const FROZEN_NOW = new Date("2026-01-01T00:00:00.000Z");
const DEFAULT_REFERENCE_TIME = FROZEN_NOW.toISOString();

const { mockedReferenceTime } = vi.hoisted(() => ({
  mockedReferenceTime: {
    value: undefined as string | undefined,
  },
}));

mockNuxtImport("useState", () => {
  return <T>(key?: string, init?: () => T) => {
    if (
      key === "referenceTime" &&
      mockedReferenceTime.value === undefined &&
      init
    ) {
      mockedReferenceTime.value = init() as string;
    }

    return mockedReferenceTime as { value: T };
  };
});

function registerEndpointAndReturnHeadersGetter(
  path: string,
  method: "GET" | "POST" = "GET",
) {
  let headers: RequestHeaders = {};

  registerEndpoint(path, {
    handler: (event) => {
      headers = getHeaders(event);
      return { success: true };
    },
    method,
  });

  return () => headers;
}

describe("useApi", () => {
  beforeEach(() => {
    vi.setSystemTime(FROZEN_NOW);
    mockedReferenceTime.value = undefined;
  });

  it("should fetch data from the endpoint", async () => {
    registerEndpoint("/api/test", {
      handler: () => ({ hello: "world" }),
      method: "GET",
    });

    const { data } = await useApi("/api/test");

    expect(data.value).toEqual({ hello: "world" });
  });

  it("should include x-reference-time header in requests", async () => {
    const getCapturedHeaders =
      registerEndpointAndReturnHeadersGetter("/api/test-headers");

    await useApi("/api/test-headers");

    expect(getCapturedHeaders()["x-reference-time"]).toBe(
      DEFAULT_REFERENCE_TIME,
    );
  });

  it("should allow passing additional headers", async () => {
    const getCapturedHeaders = registerEndpointAndReturnHeadersGetter(
      "/api/test-custom-headers",
    );

    await useApi("/api/test-custom-headers", {
      headers: {
        "x-custom": "test-value",
      },
    });

    expect(getCapturedHeaders()).toMatchObject({
      "x-custom": "test-value",
      "x-reference-time": DEFAULT_REFERENCE_TIME,
    });
  });

  it("should override a caller-provided x-reference-time header", async () => {
    const getCapturedHeaders = registerEndpointAndReturnHeadersGetter(
      "/api/test-reference-time-override",
    );

    await useApi("/api/test-reference-time-override", {
      headers: {
        "x-reference-time": "1999-01-01T00:00:00Z",
      },
    });

    expect(getCapturedHeaders()["x-reference-time"]).toBe(
      DEFAULT_REFERENCE_TIME,
    );
  });

  it("should work with different HTTP methods", async () => {
    registerEndpoint("/api/test-post", {
      handler: () => ({ status: "posted" }),
      method: "POST",
    });

    const { data } = await useApi("/api/test-post", {
      method: "POST",
      body: { some: "data" },
    });

    expect(data.value).toEqual({ status: "posted" });
  });

  it("should use the value from referenceTime state", async () => {
    const customTime = "2026-02-03T04:05:06Z";
    mockedReferenceTime.value = customTime;
    const getCapturedHeaders =
      registerEndpointAndReturnHeadersGetter("/api/test-state");

    await useApi("/api/test-state");

    expect(getCapturedHeaders()["x-reference-time"]).toBe(customTime);
  });
});
