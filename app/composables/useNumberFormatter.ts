export const useNumberFormatter = () => {
  const { locale } = useI18n({ useScope: "global" });
  const numberFormatter = computed(() => new Intl.NumberFormat(locale.value));
  const compactNumberFormatter = computed(
    () =>
      new Intl.NumberFormat(locale.value, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        notation: "compact",
        compactDisplay: "short",
      }),
  );

  const formatAsNumber = (value: number) => numberFormatter.value.format(value);
  const formatAsCompactNumber = (value: number) =>
    compactNumberFormatter.value.format(value);

  return {
    formatAsNumber,
    formatAsCompactNumber,
  };
};
