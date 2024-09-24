<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetEmployeeById } from '../query/useGetEmployeeById'
import { useGetEmployeeSalary } from '../query/useGetEmployeeSalary'
import { prettifyPhoneNumber } from '@/lib/utils'

import { identifiersList } from './identifiersList'

import { IdCardIcon, BanknoteIcon, MessageCircleIcon, PencilIcon } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { DeleteUserDialog } from '../modules'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { data: employee, isLoading } = useGetEmployeeById({ id })
const { data: salary } = useGetEmployeeSalary({ id })

const userName = computed(() =>
  employee.value?.data.data.user
    ? `${employee.value.data.data.user.lastName} ${employee.value.data.data.user.firstName}`
    : false
)
const identificationItems = computed(() => {
  let temp: { label: string; value: string | undefined }[] = []
  if (employee.value) {
    identifiersList.forEach((el) => {
      let fieldVal: string | undefined = ''
      if (employee.value.data.data.identifiers) {
        fieldVal = employee.value.data.data.identifiers.find((v) => v.type === el.fieldName)?.value

        if (el.fieldName === 'phoneNumber' && fieldVal) {
          fieldVal = prettifyPhoneNumber(fieldVal)
        }
      }
      temp.push({
        label: el.label,
        value: fieldVal
      })
    })
  }
  return temp
})

const deleteModal = ref(false)
</script>

<template>
  <div v-if="isLoading">
    <div class="flex items-center justify-between mb-6">
      <Skeleton class="rounded w-80 h-10" />
    </div>
  </div>

  <template v-else>
    <header class="flex items-center justify-between mb-10">
      <h2
        class="text-2xl font-medium scroll-m-20"
        :class="{ 'text-muted-foreground italic': !userName }"
      >
        {{ userName ? userName : 'User is not yet registered' }}
      </h2>
      <div class="flex items-center gap-2">
        <Button variant="outline" @click="router.push({ name: 'employees-edit', params: { id } })"
          >Edit user <PencilIcon class="ml-2" :size="18"
        /></Button>
        <DeleteUserDialog :id="id" />
      </div>
    </header>

    <div class="grid lg:grid-cols-2 gap-10 max-w-[1280px]">
      <div>
        <div class="flex items-center justify-between mb-5 border-b-2">
          <h3 class="text-xl font-medium">Identification details</h3>
          <IdCardIcon :size="32" />
        </div>
        <div
          v-for="item in identificationItems"
          class="flex items-center justify-between pb-4 gap-x-1"
        >
          <p>{{ item.label }}:</p>
          <p class="font-semibold">
            {{ item.value }}
          </p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-5 border-b-2">
          <h3 class="text-xl font-medium">Salary details</h3>
          <BanknoteIcon :size="32" />
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Salary:</p>
          <p class="font-semibold">{{ employee?.data.data.salary }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Allowed amount:</p>
          <p class="font-semibold">{{ employee?.data.data.percentAllowed }}%</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Enabled salary:</p>
          <p class="font-semibold">{{ salary?.data.data.enableSalary }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Earned salary:</p>
          <p class="font-semibold">{{ salary?.data.data.earnedSalary }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Salary per day:</p>
          <p class="font-semibold">{{ salary?.data.data.salaryPerDay }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Requested salary:</p>
          <p class="font-semibold">{{ salary?.data.data.requestedSalary }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Paid salary:</p>
          <p class="font-semibold">{{ salary?.data.data.paidSalary }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Working days in month:</p>
          <p class="font-semibold">{{ salary?.data.data.workingDaysInMonth }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Worked days up today:</p>
          <p class="font-semibold">{{ salary?.data.data.workedDaysToToday }}</p>
        </div>
        <div class="flex items-center justify-between pb-4 gap-x-1">
          <p>Status:</p>
          <p class="font-semibold">{{ employee?.data.data.status }}</p>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-5 border-b-2">
          <h3 class="text-xl font-medium">Comment</h3>
          <MessageCircleIcon :size="26" />
        </div>
        <div>
          <p>{{ employee?.data.data.comment }}</p>
        </div>
      </div>
    </div>
  </template>
</template>
