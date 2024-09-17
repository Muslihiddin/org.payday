<script setup lang="ts">
import type { Identifier } from '../../types'
import type { EmployeesJSON, EmployeeSendListPayload, EmployeeSendListResponse } from '../types'

import { ref } from 'vue'
import { Edit2Icon } from 'lucide-vue-next'

import { useSendEmployeeList } from '../query/usePostEmployeeList'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const props = defineProps<{ data: EmployeesJSON[] }>()

const tableFields = [
  'account',
  'comment',
  'card',
  'mfo',
  'pinfl',
  'phone',
  'passport',
  'percent',
  'inn',
  'salary'
] as (keyof EmployeesJSON)[]

const { isPending, mutate, isSuccess } = useSendEmployeeList()

const preparePayload = (json: EmployeesJSON[]): EmployeeSendListPayload[] => {
  return json.map((employee) => {
    const identifiers: Identifier[] = []

    identifiers.push({ type: 'phoneNumber', value: employee.phone ?? '' })
    identifiers.push({ type: 'inn', value: employee.inn ?? '' })
    identifiers.push({ type: 'passportSerialNumber', value: employee.passport ?? '' })
    identifiers.push({ type: 'pinfl', value: employee.pinfl ?? '' })
    identifiers.push({ type: 'accountCredit', value: employee.account ?? '' })
    identifiers.push({ type: 'mfo', value: employee.mfo ?? '' })

    return {
      cardNumber: employee.card || '',
      identifiers,
      comment: employee.comment || '',
      salary: employee.salary ? Number(employee.salary) : 0,
      percentAllowed: employee.percent ? Number(employee.percent) : 0
    }
  })
}

const responseList = ref<EmployeeSendListResponse[]>([])
const handleSending = async () => {
  const payload = preparePayload(props.data)
  mutate(payload, {
    onError: () => {},
    onSuccess: ({ data }) => {
      responseList.value = data
    }
  })
}
</script>

<template>
  <div class="overflow-x-auto mt-10 border rounded">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Card</TableHead>
          <TableHead>MFO</TableHead>
          <TableHead>PINFL</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Passport</TableHead>
          <TableHead>Percent</TableHead>
          <TableHead>INN</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead> Actions </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="!isSuccess">
          <TableRow v-for="(item, i) in data" :key="i" class="hover:bg-transparent">
            <TableCell v-for="field in tableFields" :key="field">
              <p class="text-nowrap">{{ item[field] }}</p>
            </TableCell>
          </TableRow>
        </template>

        <template v-else>
          <template v-if="responseList.length">
            <TableRow v-for="(res, idx) in responseList" :key="idx" class="hover:bg-transparent">
              <TableCell v-for="field in tableFields" :key="field">
                <template v-if="field === 'phone'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.identifiers.find((x) => x.type === 'phoneNumber')?.value }}
                  </p>
                </template>
                <template v-else-if="field === 'inn'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.identifiers.find((x) => x.type === 'inn')?.value }}
                  </p>
                </template>
                <template v-else-if="field === 'passport'">
                  <p class="text-destructive text-nowrap">
                    {{
                      res.request.identifiers.find((x) => x.type === 'passportSerialNumber')?.value
                    }}
                  </p>
                </template>
                <template v-else-if="field === 'pinfl'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.identifiers.find((x) => x.type === 'pinfl')?.value }}
                  </p>
                </template>
                <template v-else-if="field === 'account'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.identifiers.find((x) => x.type === 'accountCredit')?.value }}
                  </p>
                </template>
                <template v-else-if="field === 'mfo'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.identifiers.find((x) => x.type === 'mfo')?.value }}
                  </p>
                </template>
                <template v-else-if="field === 'card'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.cardNumber }}
                  </p>
                </template>
                <template v-else-if="field === 'comment'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.comment }}
                  </p>
                </template>
                <template v-else-if="field === 'percent'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.percentAllowed }}
                  </p>
                </template>
                <template v-else-if="field === 'salary'">
                  <p class="text-destructive text-nowrap">
                    {{ res.request.salary }}
                  </p>
                </template>
              </TableCell>
              <TableCell class="flex justify-center">
                <Button size="icon" variant="ghost"><Edit2Icon :size="14" /></Button>
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>

  <div class="flex justify-end mt-5">
    <Button :loading="isPending" @click="handleSending">Send</Button>
  </div>
</template>

<style scoped></style>
