import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { format as dateFnsFormat, parseISO } from "date-fns";
import { enUS, ptBR, es } from "date-fns/locale";

const localesMap: Record<string, any> = {
  en: enUS,
  pt: ptBR,
  es: es,
};

export const useDateFormatter = () => {
  const { locale } = useI18n({ useScope: "global" });

  const activeDateFnsLocale = computed(() => {
    // Gracefully degrade "en-US" to "en"
    const lang = (locale.value || "en").split("-")[0] as string;
    return localesMap[lang] || enUS;
  });

  const dateFormatter = computed(
    () =>
      new Intl.DateTimeFormat(locale.value, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  );

  const formatDate = (value: string) => {
    const date = parseISO(value);
    return dateFormatter.value.format(date);
  };

  const formatDatePattern = (
    date: string | Date | number,
    formatStr: string,
  ) => {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return dateFnsFormat(parsedDate, formatStr, {
      locale: activeDateFnsLocale.value,
    });
  };

  const formatAsShortDate = (date: string | Date | number) => {
    return formatDatePattern(date, "MMM d");
  };

  const formatAsFullDate = (date: string | Date | number) => {
    return formatDatePattern(date, "PP");
  };

  const formatAsWeekday = (date: string | Date | number) => {
    return formatDatePattern(date, "EEEE");
  };

  return {
    formatDate,
    formatAsShortDate,
    formatAsFullDate,
    formatAsWeekday,
  };
};
