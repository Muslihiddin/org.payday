<script setup lang="ts">
import type { RequestsFetchParams } from '../types'

import { ref, computed } from 'vue'

import { DataTable, columns } from '../modules'

import { useGetRequests } from '../query/useGetRequests'

const params = ref<RequestsFetchParams>({ page: 1, size: 10 })
const { data, isLoading } = useGetRequests(params)

const tableData = computed(() => {
  return data.value ? data.value.data.data : []
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

const handlePaginationUpdate = (val: RequestsFetchParams) => {
  params.value = val
}
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Requests
    </h2>
  </header>
  <DataTable
    :data="tableData"
    :columns="columns"
    :pagination="tablePagination"
    :loading="isLoading"
    @update:pagination="handlePaginationUpdate"
  />
</template>

<style scoped></style>
