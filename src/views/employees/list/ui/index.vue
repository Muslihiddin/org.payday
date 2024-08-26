<script setup lang="ts">
import type { FetchEmployeesParams } from '../types'

import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import { fetchEmployees } from '../api'
import { columns, DataTable } from '../modules'

import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-icons/vue'

const router = useRouter()

const params: FetchEmployeesParams = { page: 1, size: 10 }
const { data, isLoading } = useQuery({
  queryKey: ['employees', params],
  queryFn: () => fetchEmployees(params)
})
</script>

<template>
  <div>
    <header class="flex items-center justify-between mb-6">
      <h2
        class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Employees
      </h2>
      <Button variant="outline" @click="router.push({ name: 'employees-create' })">
        New employee
        <PlusIcon class="w-4 h-4 ml-1" />
      </Button>
    </header>
    <div class="w-full">
      <DataTable :columns="columns" :data="data" :loading="isLoading" />
    </div>
  </div>
</template>
