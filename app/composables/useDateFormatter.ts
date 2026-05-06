import { computed } from "vue";
import { parseISO } from "date-fns";
import { useI18n } from "vue-i18n";

export const useDateFormatter = () => {
  const { locale } = useI18n({ useScope: "global" });

  const shortDateFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        month: "short",
        day: "numeric",
      }),
  );

  const shortDateWithYearFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  );

  const fullDateFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        dateStyle: "medium",
      }),
  );

  const weekdayFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        weekday: "long",
      }),
  );

  const formatAsShortDate = (date: string) => {
    return shortDateFormatter.value.format(parseISO(date));
  };

  const formatAsShortDateWithYear = (date: string) => {
    return shortDateWithYearFormatter.value.format(parseISO(date));
  };

  const formatAsFullDate = (date: string) => {
    return fullDateFormatter.value.format(parseISO(date));
  };

  const formatAsWeekday = (date: string) => {
    return weekdayFormatter.value.format(parseISO(date));
  };

  return {
    formatAsShortDate,
    formatAsShortDateWithYear,
    formatAsFullDate,
    formatAsWeekday,
  };
};
