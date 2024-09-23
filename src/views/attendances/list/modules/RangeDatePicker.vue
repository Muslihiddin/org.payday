<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { CalendarDate, type DateValue } from '@internationalized/date'

import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'radix-vue'
import { type Grid, createMonth, toDate } from 'radix-vue/date'
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell
} from '@/components/ui/range-calendar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const date = ref({
  start: new CalendarDate(2024, 9, 19),
  end: new CalendarDate(2024, 10, 10)
}) as Ref<DateRange>

const locale = ref('en-US')
const formatter = useDateFormatter('ru')

const placeholder = ref(date.value.start) as Ref<DateValue>

const month = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0
  })
) as Ref<Grid<DateValue>>

const updateMonth = (months: number) => {
  placeholder.value = placeholder.value.add({ months })
}

watch(placeholder, (_placeholder) => {
  month.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value
  })
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2" :size="16" />
        <template v-if="date.start">
          <template v-if="date.end">
            {{
              formatter.custom(toDate(date.start), {
                dateStyle: 'short'
              })
            }}
            -
            {{
              formatter.custom(toDate(date.end), {
                dateStyle: 'short'
              })
            }}
          </template>

          <template v-else>
            {{
              formatter.custom(toDate(date.start), {
                dateStyle: 'short'
              })
            }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-3">
      <RangeCalendarRoot
        v-slot="{ weekDays }"
        v-model="date"
        v-model:placeholder="placeholder"
        :week-starts-on="1"
      >
        <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <button
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                  )
                "
                @click="updateMonth(-1)"
              >
                <ChevronLeftIcon :size="16" />
              </button>
              <div :class="cn('text-sm font-medium')">
                {{ useDateFormatter('en').fullMonthAndYear(toDate(month.value)) }}
              </div>

              <button
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                  )
                "
                @click="updateMonth(1)"
              >
                <ChevronRightIcon :size="16" />
              </button>
            </div>
            <RangeCalendarGrid>
              <RangeCalendarGridHead>
                <RangeCalendarGridRow>
                  <RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="w-full">
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger :day="weekDate" :month="month.value" />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </div>
      </RangeCalendarRoot>

      <div class="mt-5 flex items-center justify-between">
        <Button size="xs" variant="outline">Today</Button>
        <div class="flex items-center gap-x-2">
          <Button size="xs" variant="outline">Reset</Button>
          <Button size="xs">Apply</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
