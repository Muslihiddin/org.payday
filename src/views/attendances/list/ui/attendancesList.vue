<script setup lang="ts">
import type { AttendancesFetchParams, AttendanceTableData } from '../types'
import type { ColumnDef } from '@tanstack/vue-table'

import { computed, ref, watch } from 'vue'
import { CalendarDate, getLocalTimeZone, type DateValue } from '@internationalized/date'

import { useGetAttendances } from '../query/useGetAttendances'
import {
  AttendancesCustomTable,
  RangeDatePicker,
  prepareTableData,
  prepareColumns,
  uniqueDates
} from '../modules'

const date = ref({
  start: undefined,
  end: undefined
})
watch(date, (newValue) => {
  if (newValue.start && newValue.end) {
    params.value = {
      page: 1,
      size: 20,
      fromDate: (newValue.start as DateValue).toString(),
      toDate: (newValue.end as DateValue).toString()
    }
  } else {
    params.value = { page: 1, size: 20 }
  }
})

const params = ref<AttendancesFetchParams>({ page: 1, size: 20 })
const { data, isLoading } = useGetAttendances(params)

const tableData = ref<AttendanceTableData[]>([])
const columns = ref<ColumnDef<AttendanceTableData>[]>([])

watch(data, (newValue) => {
  if (newValue) {
    tableData.value = prepareTableData(newValue.data)
    columns.value = prepareColumns(uniqueDates)
  }
})

const tablePagination = computed(() => {
  if (data.value) {
    const xPag = JSON.parse(data.value.headers['x-pagination'])
    return {
      currentPage: xPag.CurrentPage,
      totalCount: xPag.TotalCount,
      totalPages: xPag.TotalPages,
      pageSize: xPag.PageSize,
      canPrevPage: xPag.HasPrevious,
      canNextPage: xPag.HasNext
    }
  } else {
    return {
      currentPage: 0,
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
      canPrevPage: 0,
      canNextPage: 0
    }
  }
})
const handlePaginationUpdate = (val: AttendancesFetchParams) => {
  params.value = val
}
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Attendances
    </h2>
    <div class="flex items-center"></div>
  </header>

  <div class="mb-3">
    <RangeDatePicker v-model="date" />
  </div>

  <AttendancesCustomTable
    :data="tableData"
    :columns="columns"
    :loading="isLoading"
    :pagination="tablePagination"
    @update:pagination="handlePaginationUpdate"
  />
</template>
