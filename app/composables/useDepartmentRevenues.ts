import { isThisWeek, isToday, isYesterday } from "date-fns";
import type { DepartmentRevenuesByDate } from "~/types/revenue";

export function useDepartmentRevenues() {
  const dateRange = ref(getLocal7DaysDateRange());
  const { data, pending } = useApi("/api/revenue/departments", {
    query: dateRange,
  });

  const { formatAsMoney } = useMoneyFormatter();

  const { formatAsShortDate, formatAsWeekday, formatAsFullDate } =
    useDateFormatter();

  const revenues = computed(() => data.value?.data.revenues.toReversed() ?? []);
  const totalRevenue = computed(() =>
    data.value ? formatAsMoney(data.value.data.total_revenue) : "",
  );

  const { t } = useI18n({ useScope: "global" });

  function revenuesDateGetter({ date }: DepartmentRevenuesByDate) {
    if (isToday(date)) {
      return t("today");
    }
    if (isYesterday(date)) {
      return t("yesterday");
    }
    if (isThisWeek(date)) {
      return formatAsWeekday(date);
    }
    return formatAsShortDate(date);
  }

  const chartType = computed(() =>
    getRevenueByDepartmentChartType({ days: revenues.value.length }),
  );

  function revenuesFullDateGetter({ date }: DepartmentRevenuesByDate) {
    return formatAsFullDate(date);
  }

  return {
    pending,
    dateRange,
    revenues,
    totalRevenue,
    revenuesDateGetter,
    chartType,
    revenuesFullDateGetter,
  };
}
