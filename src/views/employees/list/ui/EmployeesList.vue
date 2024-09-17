<script setup lang="ts">
import type { FetchEmployeesParams } from "../types";

import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { fetchEmployees } from "../api";
import { columns, DataTable, UploadEmployeesDialog } from "../modules";

import { Button } from "@/components/ui/button";

const router = useRouter();

const params = ref<FetchEmployeesParams>({ page: 1, size: 10 });
const { data, isLoading } = useQuery({
  queryKey: ["employees", params],
  queryFn: () => fetchEmployees(params.value),
});

const tableData = computed(() => data.value?.data.data || []);
const tablePagination = computed(() => {
  if (data.value) {
    const xPag = JSON.parse(data.value.headers["x-pagination"]);
    return {
      currentPage: xPag.CurrentPage,
      totalCount: xPag.TotalCount,
      totalPages: xPag.TotalPages,
      pageSize: xPag.PageSize,
      canPrevPage: xPag.HasPrevious,
      canNextPage: xPag.HasNext,
    };
  } else {
    return {
      currentPage: 0,
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
      canPrevPage: 0,
      canNextPage: 0,
    };
  }
});

const handlePaginationUpdate = (val: FetchEmployeesParams) => {
  params.value = val;
};
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Employees
    </h2>
    <div class="flex items-center">
      <UploadEmployeesDialog />

      <Button
        variant="outline"
        @click="router.push({ name: 'employees-create' })"
      >
        New employee
      </Button>
    </div>
  </header>

  <DataTable
    :data="tableData"
    :columns="columns"
    :pagination="tablePagination"
    :loading="isLoading"
    @update:pagination="handlePaginationUpdate"
  />
</template>
