<script setup lang="ts">
import {
  parseDate,
  today,
  getLocalTimeZone,
  type CalendarDate,
} from "@internationalized/date";

// ---- i18n ----
const { locale } = useI18n({ useScope: "global" });

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

function dateToISO(date: CalendarDate): string {
  return date.toString();
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

  // ⛔ Only sync when complete
  if (!start || !end) return;

  const next = {
    start: dateToISO(start),
    end: dateToISO(end),
  };

  // ✅ Prevent unnecessary updates
  if (next.start === range.value.start && next.end === range.value.end) {
    return;
  }

  range.value = next;

  // ✅ UX: close on full selection
  isOpen.value = false;
});

// ---- UX: autofill end date on close ----
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
    <DateRangePickerField
      v-slot="{ segments }"
      class="focus-within:ring-primary-500 flex w-fit items-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm text-white focus-within:ring-2"
    >
      <!-- Start -->
      <template
        v-for="(item, index) in segments.start"
        :key="'start-' + item.part + '-' + index"
      >
        <DateRangePickerInput
          v-if="item.part !== 'literal'"
          :part="item.part"
          type="start"
          class="rounded px-0.5 tabular-nums outline-none focus:bg-gray-600 focus:text-white"
        >
          {{ item.value }}
        </DateRangePickerInput>
        <span v-else class="text-gray-400">{{ item.value }}</span>
      </template>

      <span class="mx-2 text-gray-500">-</span>

      <!-- End -->
      <template
        v-for="(item, index) in segments.end"
        :key="'end-' + item.part + '-' + index"
      >
        <DateRangePickerInput
          v-if="item.part !== 'literal'"
          :part="item.part"
          type="end"
          class="rounded px-0.5 tabular-nums outline-none focus:bg-gray-600 focus:text-white"
        >
          {{ item.value }}
        </DateRangePickerInput>
        <span v-else class="text-gray-400">{{ item.value }}</span>
      </template>

      <DateRangePickerTrigger
        class="ml-2 cursor-pointer text-gray-400 hover:text-white"
      >
        <Icon name="mdi:calendar" class="h-4 w-4" />
      </DateRangePickerTrigger>
    </DateRangePickerField>

    <DateRangePickerContent
      class="z-50 mt-1 w-auto rounded-lg border border-gray-600 bg-gray-800 p-3 font-sans text-white shadow-xl outline-none"
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
                    class="focus:ring-primary-400 data-[today]:text-primary-400 data-[selection-start]:bg-primary-600 data-[selection-end]:bg-primary-600 inline-flex h-full w-full items-center justify-center rounded p-0 text-sm whitespace-nowrap hover:bg-gray-700 focus:ring-2 focus:outline-none data-[disabled]:text-gray-500 data-[disabled]:opacity-50 data-[highlighted]:bg-gray-700 data-[outside-view]:text-gray-500 data-[selected]:bg-gray-700 data-[selection-end]:rounded-r-md data-[selection-end]:text-white data-[selection-start]:rounded-l-md data-[selection-start]:text-white data-[today]:font-bold"
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
