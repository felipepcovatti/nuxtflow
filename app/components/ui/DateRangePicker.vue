<script setup lang="ts">
import {
  isEqualDay,
  parseDate,
  type CalendarDate,
  type DateDuration,
} from "@internationalized/date";

import { PERIOD_PRESETS, type PeriodPreset } from "~/constants/api";

const { locale } = useI18n();
const { formatAsShortDate } = useDateFormatter();

const props = defineProps<{
  minStart?: "one-year-ago";
  disableFuture?: boolean;
}>();

const range = defineModel<{ start: string; end: string }>({
  required: true,
});

const isOpen = ref(false);

const minDate = computed(() => {
  if (props.minStart === "one-year-ago") {
    return getToday().subtract({ years: 1 }).add({ days: 1 });
  }
  return undefined;
});

const maxDate = computed(() => {
  if (props.disableFuture) {
    return getToday();
  }
  return undefined;
});

const internalRange = shallowRef<{
  start: CalendarDate | undefined;
  end: CalendarDate | undefined;
}>({
  start: parseDate(range.value.start),
  end: parseDate(range.value.end),
});

watch(internalRange, ({ end, start }, { start: previousStart }) => {
  if (!start) {
    internalRange.value = {
      start: previousStart || parseDate(range.value.start),
      end,
    };
    return;
  }
  if (!end) return;
  range.value = {
    start: start.toString(),
    end: end.toString(),
  };
  isOpen.value = false;
});

watch(isOpen, (open) => {
  if (!open && internalRange.value.start && !internalRange.value.end) {
    internalRange.value = {
      start: internalRange.value.start,
      end: getToday(),
    };
  }
});

const durationByPreset: Record<PeriodPreset, DateDuration> = {
  "7D": { days: 7 },
  "30D": { days: 30 },
  "90D": { days: 90 },
  "1Y": { years: 1 },
};

const activePreset = computed({
  get() {
    const { end, start } = internalRange.value;
    if (!start || !end) return null;
    const today = getToday();
    if (!isEqualDay(end, today)) return null;
    const preset = PERIOD_PRESETS.find((preset) => {
      const duration = durationByPreset[preset];
      const presetStart = today.subtract(duration).add({ days: 1 });
      return isEqualDay(start, presetStart);
    });
    return preset || null;
  },
  set(preset: PeriodPreset) {
    const duration = durationByPreset[preset];
    internalRange.value = {
      start: getToday().subtract(duration).add({ days: 1 }),
      end: getToday(),
    };
  },
});
</script>

<template>
  <DateRangePickerRoot
    v-model="internalRange"
    v-model:open="isOpen"
    :min-value="minDate"
    :max-value="maxDate"
    :locale="locale"
  >
    <DateRangePickerTrigger class="button min-w-39 justify-start gap-2">
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
    </DateRangePickerTrigger>

    <DateRangePickerContent
      align="end"
      class="z-50 mt-2 ml-10 rounded-lg bg-gray-900 p-3 text-gray-200 shadow-lg"
    >
      <div class="flex flex-col gap-4 lg:flex-row-reverse">
        <DateRangePickerCalendar v-slot="{ grid, weekDays }" class="p-1">
          <DateRangePickerHeader class="flex items-center justify-between">
            <DateRangePickerPrev
              class="inline-flex cursor-pointer rounded p-2 hover:bg-gray-800"
            >
              <Icon name="mdi:chevron-left" />
            </DateRangePickerPrev>

            <DateRangePickerHeading class="text-sm" />

            <DateRangePickerNext
              class="inline-flex cursor-pointer rounded p-2 hover:bg-gray-800"
            >
              <Icon name="mdi:chevron-right" />
            </DateRangePickerNext>
          </DateRangePickerHeader>

          <DateRangePickerGrid
            v-for="month in grid"
            class="mt-3"
            :key="month.value.toString()"
          >
            <DateRangePickerGridHead>
              <DateRangePickerGridRow class="mb-1 flex">
                <DateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="w-8 text-xs font-normal text-gray-400"
                >
                  {{ day }}
                </DateRangePickerHeadCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridHead>

            <DateRangePickerGridBody>
              <DateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="index"
                class="flex"
              >
                <DateRangePickerCell
                  v-for="date in weekDates"
                  :key="date.toString()"
                  :date="date"
                  class="m-px h-8 w-8"
                >
                  <DateRangePickerCellTrigger
                    :day="date"
                    :month="month.value"
                    :class="[
                      'flex h-full w-full items-center justify-center rounded text-sm',
                      'focus-visible:ring-primary-400 focus:outline-none focus-visible:ring-2',
                      'hover:not-data-disabled:ring-primary-400 not-data-disabled:cursor-pointer not-data-disabled:hover:ring',
                      'data-disabled:text-gray-500 data-disabled:opacity-50',
                      'data-outside-view:not-data-highlighted:not-data-selected:text-gray-500',
                      'data-today:not-data-highlighted:not-data-selected:text-primary-400 data-today:font-bold',
                      'data-highlighted:bg-primary-300/20 data-highlighted-end:bg-primary-700 data-highlighted-start:bg-primary-700 data-highlighted:text-white',
                      'data-selected:bg-primary-300/20 data-selected:text-white',
                      'data-selection-start:bg-primary-700 data-selection-end:bg-primary-700',
                    ]"
                  />
                </DateRangePickerCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridBody>
          </DateRangePickerGrid>
        </DateRangePickerCalendar>
        <RadioGroupRoot
          v-model="activePreset"
          class="flex flex-col gap-1"
          aria-label="Select a date range preset"
        >
          <RadioGroupItem
            v-for="period in PERIOD_PRESETS"
            :key="period"
            :value="period"
            :class="[
              'button justify-start rounded-sm',
              'hover:bg-primary-700 hover:text-white',
              'aria-checked:bg-primary-300/20 aria-checked:text-white',
            ]"
          >
            {{ $t(`dataPeriods.${period}`) }}
          </RadioGroupItem>
        </RadioGroupRoot>
      </div>
    </DateRangePickerContent>
  </DateRangePickerRoot>
</template>
