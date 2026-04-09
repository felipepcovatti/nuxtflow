import { computed } from "vue";
import { useI18n, type Locale } from "vue-i18n";
import { format, parseISO, type Locale as DateLocale } from "date-fns";
import { enUS } from "date-fns/locale";

const daleLocales: Record<Locale, DateLocale> = {
  en: enUS,
};

export const useDateFormatter = () => {
  const { locale } = useI18n({ useScope: "global" });

  const dateLocale = computed(() => {
    const lang = locale.value;
    return daleLocales[lang] || enUS;
  });

  const formatDateToPattern = computed(
    () => (date: string, pattern: string) => {
      const parsedDate = parseISO(date);
      return format(parsedDate, pattern, {
        locale: dateLocale.value,
      });
    },
  );

  const formatAsShortDate = (date: string) => {
    return formatDateToPattern.value(date, "MMM d");
  };

  const formatAsShortDateWithYear = (date: string) => {
    return formatDateToPattern.value(date, "MMM d, yyyy");
  };

  const formatAsFullDate = (date: string) => {
    return formatDateToPattern.value(date, "PP");
  };

  const formatAsWeekday = (date: string) => {
    return formatDateToPattern.value(date, "EEEE");
  };

  return {
    formatAsShortDate,
    formatAsShortDateWithYear,
    formatAsFullDate,
    formatAsWeekday,
  };
};
