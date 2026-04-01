export function useCountryName() {
  const { locale } = useI18n({ useScope: "global" });

  const regionNames = computed(() => {
    return new Intl.DisplayNames([locale.value], { type: "region" });
  });

  const getCountryName = (code: string) => regionNames.value.of(code) ?? code;

  return { getCountryName };
}
