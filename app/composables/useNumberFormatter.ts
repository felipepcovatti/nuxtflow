export const useNumberFormatter = () => {
  const { locale } = useI18n();
  const numberFormatter = computed(() => new Intl.NumberFormat(locale.value));

  const formatAsNumber = (value: number) => numberFormatter.value.format(value);

  return {
    formatAsNumber,
  };
};
