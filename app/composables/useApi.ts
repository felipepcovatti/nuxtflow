export const useApi = createUseFetch(() => {
  const referenceTime = useState("referenceTime", () =>
    new Date().toISOString(),
  );
  return {
    onRequest({ options }) {
      options.headers.set("x-reference-time", referenceTime.value);
    },
  };
});
