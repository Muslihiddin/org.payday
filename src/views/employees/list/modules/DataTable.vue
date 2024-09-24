<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon
} from '@radix-icons/vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  loading: boolean
  pagination: {
    currentPage: number
    totalCount: number
    totalPages: number
    pageSize: number
    canPrevPage: boolean
    canNextPage: boolean
  }
}>()

type PaginationEmitValues = { key: 'size' | 'page'; value: number }

const emit = defineEmits(['update:pagination'])
const updatePagination = (val: PaginationEmitValues) => {
  emit('update:pagination', { [val.key]: val.value })
}

const table = useVueTable({
  get data() {
    return props.data ?? []
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true
})
</script>

<template>
  <div class="border rounded overflow-auto max-h-[500px]">
    <Table class="w-full">
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="loading">
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center"> Loading... </TableCell>
          </TableRow>
        </template>
        <template v-else-if="table.getRowModel().rows.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <div class="flex items-center justify-between py-4 space-x-2">
    <div class="flex items-center space-x-2">
      <p class="text-sm font-medium">Rows per page</p>
      <Select
        :model-value="String(pagination.pageSize)"
        @update:model-value="(value) => updatePagination({ key: 'size', value: Number(value) })"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue :placeholder="String(pagination.pageSize)" />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem
            v-for="pageSize in ['10', '20', '30', '40', '50']"
            :key="pageSize"
            :value="pageSize"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ pagination.currentPage }} of
        {{ pagination.totalPages }}
      </div>

      <Button
        class="hidden w-8 h-8 p-0 lg:flex"
        variant="outline"
        :disabled="!pagination.canPrevPage"
        @click="updatePagination({ key: 'page', value: 1 })"
      >
        <span class="sr-only">Go to first page</span>
        <DoubleArrowLeftIcon class="w-4 h-4" />
      </Button>
      <Button
        class="hidden w-8 h-8 p-0 lg:flex"
        variant="outline"
        size="sm"
        :disabled="!pagination.canPrevPage"
        @click="updatePagination({ key: 'page', value: pagination.currentPage - 1 })"
      >
        <span class="sr-only">Go to previous page</span>
        <ChevronLeftIcon class="w-4 h-4" />
      </Button>
      <Button
        class="hidden w-8 h-8 p-0 lg:flex"
        variant="outline"
        size="sm"
        :disabled="!pagination.canNextPage"
        @click="updatePagination({ key: 'page', value: pagination.currentPage + 1 })"
      >
        <span class="sr-only">Go to next page</span>
        <ChevronRightIcon class="w-4 h-4" />
      </Button>
      <Button
        class="hidden w-8 h-8 p-0 lg:flex"
        variant="outline"
        size="sm"
        :disabled="!pagination.canNextPage"
        @click="updatePagination({ key: 'page', value: pagination.totalPages })"
      >
        <span class="sr-only">Go to last page</span>
        <DoubleArrowRightIcon class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
