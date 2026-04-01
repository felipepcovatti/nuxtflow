export const useApi = createUseFetch(() => {
  const referenceTime = useState<string>("reference-time", () =>
    new Date().toISOString(),
  );

  return {
    onRequest({ options }) {
      const headers = new Headers(options.headers || {});

      headers.set("x-reference-time", referenceTime.value);

      options.headers = headers;
    },
  };
});
