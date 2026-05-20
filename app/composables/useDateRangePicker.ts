import type {
  CalendarDateRange,
  DateRange,
  DateRangePreset,
} from "~/types/date";
import type { ShallowRef } from "vue";

type PickerRangeModel = ShallowRef<{
  start: CalendarDateRange["start"] | undefined;
  end: CalendarDateRange["end"] | undefined;
}>;

export function useDateRangePicker(range: Ref<DateRange>) {
  const minDate = computed(() => getLocalOneYearAgoCalendarDate());
  const maxDate = computed(() => getLocalTodayCalendarDate());

  const isOpen = ref(false);

  const rangeModel: PickerRangeModel = shallowRef(
    getLocalCalendarDateRangeFromDateRange(range.value),
  );

  watch(rangeModel, ({ end, start }, { start: previousStart }) => {
    if (!start) {
      rangeModel.value = {
        start: previousStart || getLocalCalendarDateFromDate(range.value.start),
        end,
      };
      return;
    }
    if (!end) return;
    range.value = getLocalDateRangeFromCalendarDateRange({ start, end });
    isOpen.value = false;
  });

  watch(isOpen, (open) => {
    if (!open && rangeModel.value.start && !rangeModel.value.end) {
      rangeModel.value = {
        start: rangeModel.value.start,
        end: maxDate.value,
      };
    }
  });

  const presetModel = computed({
    get() {
      const { end, start } = rangeModel.value;
      if (!start || !end) return;
      return getPresetFromCalendarDateRange({ start, end });
    },
    set(preset?: DateRangePreset) {
      if (preset && preset !== presetModel.value) {
        rangeModel.value = getLocalCalendarDateRangeFromPreset(preset);
      } else {
        isOpen.value = false;
      }
    },
  });

  const { formatAsShortDate } = useDateFormatter();

  const formatedRange = computed(() => {
    const { start, end } = rangeModel.value;
    return {
      start: start && formatAsShortDate(start.toString()),
      end: end && formatAsShortDate(end.toString()),
    };
  });

  return {
    minDate,
    maxDate,
    rangeModel,
    isOpen,
    presetModel,
    formatedRange,
  };
}
