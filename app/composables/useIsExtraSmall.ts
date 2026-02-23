import { breakpointsTailwind } from "@vueuse/core";

export const useIsExtraSmall = () => {
  const { smaller } = useBreakpoints(breakpointsTailwind);

  const isExtraSmall = smaller("sm");

  return {
    isExtraSmall,
  };
};
