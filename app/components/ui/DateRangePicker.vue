<script setup lang="ts">
import {
  parseDate,
  today,
  getLocalTimeZone,
  type CalendarDate,
} from "@internationalized/date";

// ---- i18n & Formatter ----
const { locale } = useI18n({ useScope: "global" });
const { formatAsShortDate } = useDateFormatter();

// ---- Props ----
const props = defineProps<{
  minPreset?: "lastYear";
  disableFuture?: boolean;
}>();

// ---- External model ----
const range = defineModel<{ start: string; end: string }>({
  required: true,
});

// ---- UI state ----
const isOpen = ref(false);

// ---- Helpers ----
function getToday(): CalendarDate {
  return today(getLocalTimeZone());
}

function isoToDate(date?: string): CalendarDate | undefined {
  return date ? parseDate(date) : undefined;
}

// ---- Min / Max ----
const minDate = computed(() => {
  if (props.minPreset === "lastYear") {
    return getToday().subtract({ years: 1 });
  }
  return undefined;
});

const maxDate = computed(() => {
  if (props.disableFuture) {
    return getToday();
  }
  return undefined;
});

// ---- Clamp ----
function clamp(date: CalendarDate): CalendarDate {
  const min = minDate.value;
  const max = maxDate.value;

  if (min && date.compare(min) < 0) return min;
  if (max && date.compare(max) > 0) return max;

  return date;
}

// ---- Internal state (CRITICAL: shallowRef) ----
const internalRange = shallowRef<{
  start: CalendarDate | undefined;
  end: CalendarDate | undefined;
}>({
  start: isoToDate(range.value.start),
  end: isoToDate(range.value.end),
});

// ---- Core watcher (single source of truth) ----
watch(internalRange, (val) => {
  let start = val.start;
  let end = val.end;

  // ✅ Clamp individually (fixes invalid typing like year 1800)
  if (start) start = clamp(start);
  if (end) end = clamp(end);

  // ✅ If clamped changed something → update once and stop
  if (
    (start && val.start && start.compare(val.start) !== 0) ||
    (end && val.end && end.compare(val.end) !== 0)
  ) {
    internalRange.value = { start, end };
    return;
  }

  if (!start || !end) return;

  range.value = {
    start: start.toString(),
    end: end.toString(),
  };

  // UX: close on full selection
  isOpen.value = false;
});

// UX: autofill end date on close
watch(isOpen, (open) => {
  if (!open && internalRange.value.start && !internalRange.value.end) {
    internalRange.value = {
      start: internalRange.value.start,
      end: clamp(getToday()),
    };
  }
});
</script>

<template>
  <DateRangePickerRoot
    v-model="internalRange"
    v-model:open="isOpen"
    :min-value="minDate"
    :max-value="maxDate"
    :locale="locale"
    class="relative isolate flex w-full justify-end"
  >
    <DateRangePickerTrigger as-child>
      <button class="button min-w-37 justify-start gap-2">
        <Icon name="flowbite:calendar-month-solid" />
        <div class="flex flex-1 justify-between gap-1">
          <div v-if="internalRange.start">
            {{ formatAsShortDate(internalRange.start.toString()) }}
          </div>
          <div v-if="internalRange.end">-</div>
          <div v-if="internalRange.end">
            {{ formatAsShortDate(internalRange.end.toString()) }}
          </div>
        </div>
      </button>
    </DateRangePickerTrigger>

    <DateRangePickerContent
      align="end"
      class="z-50 mt-2 w-auto rounded-lg border border-gray-600 bg-gray-800 p-3 font-sans text-white shadow-xl outline-none"
    >
      <DateRangePickerCalendar v-slot="{ grid, weekDays }" class="p-1">
        <DateRangePickerHeader
          class="mb-3 flex items-center justify-between text-sm"
        >
          <DateRangePickerPrev
            class="inline-flex cursor-pointer items-center justify-center rounded p-1 text-white hover:bg-gray-700"
          >
            <Icon name="mdi:chevron-left" class="h-5 w-5" />
          </DateRangePickerPrev>

          <DateRangePickerHeading class="font-medium" />

          <DateRangePickerNext
            class="inline-flex cursor-pointer items-center justify-center rounded p-1 text-white hover:bg-gray-700"
          >
            <Icon name="mdi:chevron-right" class="h-5 w-5" />
          </DateRangePickerNext>
        </DateRangePickerHeader>

        <div class="flex flex-col gap-4">
          <DateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none"
          >
            <DateRangePickerGridHead>
              <DateRangePickerGridRow
                class="mb-1 flex w-full items-center justify-between"
              >
                <DateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="w-8 text-center text-[0.8rem] font-medium text-gray-400 uppercase"
                >
                  {{ day }}
                </DateRangePickerHeadCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridHead>

            <DateRangePickerGridBody>
              <DateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="mt-1 flex w-full"
              >
                <DateRangePickerCell
                  v-for="date in weekDates"
                  :key="date.toString()"
                  :date="date"
                  class="relative h-8 w-8 p-0 text-center text-sm focus-within:z-20"
                >
                  <DateRangePickerCellTrigger
                    :day="date"
                    :month="month.value"
                    class="focus:ring-primary-400 data-today:text-primary-400 data-selection-start:bg-primary-600 data-selection-end:bg-primary-600 inline-flex h-full w-full items-center justify-center rounded p-0 text-sm whitespace-nowrap not-data-disabled:cursor-pointer not-data-disabled:hover:bg-gray-700 focus:ring-2 focus:outline-none data-disabled:text-gray-500 data-disabled:opacity-50 data-highlighted:bg-gray-700 data-outside-view:text-gray-500 data-selected:bg-gray-700 data-selection-end:rounded-r-md data-selection-end:text-white data-selection-start:rounded-l-md data-selection-start:text-white data-today:font-bold"
                  />
                </DateRangePickerCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridBody>
          </DateRangePickerGrid>
        </div>
      </DateRangePickerCalendar>
    </DateRangePickerContent>
  </DateRangePickerRoot>
</template>
