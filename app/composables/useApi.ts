import { formatISO } from "date-fns";

export const useApi = createUseFetch(() => {
  const referenceTime = useState("referenceTime", () => formatISO(new Date()));
  return {
    onRequest({ options }) {
      options.headers.set("x-reference-time", referenceTime.value);
    },
  };
});
