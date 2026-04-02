import { formatISO } from "date-fns";

export const useApi = createUseFetch(() => {
  const referenceTime = useState("referenceTime", () => formatISO(new Date()));
  return {
    onRequest({ options }) {
      const headers = new Headers(options.headers || {});
      headers.set("x-reference-time", referenceTime.value);
      options.headers = headers;
    },
  };
});
