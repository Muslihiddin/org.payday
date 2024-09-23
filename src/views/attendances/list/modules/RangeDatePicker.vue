<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { today, getLocalTimeZone, type DateValue } from '@internationalized/date'

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

const model = defineModel<DateRange>({
  default: { start: undefined, end: undefined },
  required: true
})

const locale = ref('en-US')
const formatter = useDateFormatter('ru')

const placeholder = ref(today(getLocalTimeZone())) as Ref<DateValue>

const month = ref(
  createMonth({
    weekStartsOn: 1,
    locale: locale.value,
    fixedWeeks: true,
    dateObj: today(getLocalTimeZone())
  })
) as Ref<Grid<DateValue>>

const updateMonth = (months: number) => {
  placeholder.value = placeholder.value.add({ months })
}

const goToToday = () => {
  placeholder.value = today(getLocalTimeZone())
}

watch(placeholder, (_placeholder) => {
  month.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 1,
    fixedWeeks: true,
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
          cn('w-[280px] justify-start text-left font-normal', !model && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2" :size="16" />
        <template v-if="model.start">
          <template v-if="model.end">
            {{
              formatter.custom(toDate(model.start), {
                dateStyle: 'short'
              })
            }}
            -
            {{
              formatter.custom(toDate(model.end), {
                dateStyle: 'short'
              })
            }}
          </template>

          <template v-else>
            {{
              formatter.custom(toDate(model.start), {
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
        v-model="model"
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

      <div class="mt-5 flex justify-end">
        <Button variant="outline" @click="goToToday">Today</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
