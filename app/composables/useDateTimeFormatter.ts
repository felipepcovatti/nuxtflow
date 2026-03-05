import { computed } from "vue";
import { useI18n } from "vue-i18n";

export const useDateTimeFormatter = () => {
  const { locale } = useI18n({ useScope: "global" });

  const dateFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  );

  const formatAsDate = (value: string) => {
    const date = new Date(value);
    return dateFormatter.value.format(date);
  };

  return {
    formatAsDate,
  };
};
