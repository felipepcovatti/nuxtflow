export const useMoneyFormatter = ({
  currency = "USD",
}: { currency?: "USD" } = {}) => {
  const { locale } = useI18n();

  const moneyFormatter = computed(
    () =>
      new Intl.NumberFormat(locale.value, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  );

  const compactMoneyFormatter = computed(
    () =>
      new Intl.NumberFormat(locale.value, {
        style: "currency",
        currency,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        notation: "compact",
        compactDisplay: "short",
      }),
  );

  const formatAsMoney = (value: number) => moneyFormatter.value.format(value);

  const formatAsCompactMoney = (value: number) =>
    compactMoneyFormatter.value.format(value);

  return {
    formatAsMoney,
    formatAsCompactMoney,
  };
};
