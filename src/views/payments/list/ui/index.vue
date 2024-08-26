<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { columns } from '../modules'
import DataTable from '../modules/DataTable.vue'
import { useGetPayments } from '../query/useGetPayments'
import type { FetchPaymentsParams, PayloadPayments } from '../types'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { fetchEmployees } from '@/views/employees/list/api'
import { useQuery } from '@tanstack/vue-query'
import { useCreatePayments } from '../query/usePostPayments'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(
  z.object({
    employeeId: z.string().nonempty({ message: 'Please select an employee' }),
    amount: z.union([
      z
        .string()
        .nonempty('Field is required')
        .refine((val) => !isNaN(Number(val)), {
          message: "Raqam bo'lish kerak"
        }),
      z.number()
    ])
  })
)

const { handleSubmit, resetForm } = useForm<PayloadPayments>({
  validationSchema: formSchema,
  initialValues: {
    employeeId: '',
    amount: ''
  }
})
const params: FetchPaymentsParams = { page: 1, size: 10 }
const params2: FetchPaymentsParams = { page: 1, size: 1000, isAll: true }
const { data, isLoading } = useGetPayments(params)
const { data: employee, isLoading: employeeLoading } = useQuery({
  queryKey: ['employees'],
  queryFn: () => fetchEmployees(params2)
})

const { mutate, isPending } = useCreatePayments()

const Create = handleSubmit((values: PayloadPayments) => {
  mutate(values, {
    onSuccess: () => {
      toast.success('Success')

      resetForm()
    },
    onError: (error) => {
      toast.error(error.response.data.error.message || 'Error occurred')

      console.log(error)
    }
  })
})
</script>

<template>
  <div>
    <header class="flex justify-between items-center">
      <div>Payments</div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">New Salary</Button>
        </DialogTrigger>
        <DialogContent>
          <form @submit.prevent="Create" class="flex flex-col gap-5">
            <FormField v-slot="{ componentField }" name="employeeId">
              <FormItem class="mb-5">
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Select class="w-full" v-bind="componentField">
                    <SelectTrigger class="w-[280px]">
                      <SelectValue placeholder="Choose employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="item in employee"
                          :key="String(item?.id)"
                          :value="String(item?.id)"
                        >
                          {{
                            employeeLoading
                              ? 'Loading'
                              : item?.user?.firstName + ' ' + item?.user?.lastName
                          }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div class="relative w-full items-center">
                    <Input class="pr-10" type="number" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button type="submit">{{ isPending ? 'Loading...' : 'Submit' }}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
    <div class="mt-6 w-full">
      <DataTable :columns="columns" :data="data" :loading="isLoading" />
    </div>
  </div>
</template>
