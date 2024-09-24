<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetEmployeeById } from '../../detail/query/useGetEmployeeById'
import { useUpdateEmployee } from '../query/useEditEmployee'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const router = useRouter()
const route = useRoute()
const id = route.params.id as string

const {
  data: employee,
  error: employeeError,
  isLoading: isEmployeeLoading,
  isError: isEmployeeError
} = useGetEmployeeById({ id })

const formSchema = toTypedSchema(
  z.object({
    status: z.enum(['active', 'blocked', 'leftTheCompany']),
    comment: z.string(),
    salary: z.number(),
    percentAllowed: z.number().min(0).max(100)
  })
)
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    status: undefined,
    comment: '',
    salary: 0,
    percentAllowed: 0
  }
})
watch(employee, (newData) => {
  if (newData) {
    const employee = newData.data.data
    form.resetForm({
      values: {
        status: employee.status,
        comment: employee.comment,
        salary: employee.salary,
        percentAllowed: employee.percentAllowed
      }
    })
  }
})

const { isPending, mutate } = useUpdateEmployee()
const onSubmit = form.handleSubmit((values) => {
  mutate(
    { id: id, payload: values },
    {
      onError: () => {},
      onSuccess: () => {
        toast.success('Employee data successfully updated')
        router.push({ name: 'employees-detail', params: { id } })
      }
    }
  )
})
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Employee edit
    </h2>
    <div class="flex items-center"></div>
  </header>

  <div v-if="isEmployeeLoading">
    <p>Loading...</p>
  </div>

  <div v-else-if="isEmployeeError">
    <pre>
      {{ employeeError }}
    </pre>
  </div>

  <form v-else @submit="onSubmit" class="max-w-[800px]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField v-slot="{ componentField }" name="salary">
        <FormItem class="md:col-span-2">
          <FormLabel>Salary</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter salary"
              v-bind="componentField"
              :disabled="isPending"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="percentAllowed">
        <FormItem>
          <FormLabel>Allowed percent</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter allowed percent"
              v-bind="componentField"
              :disabled="isPending"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger :disabled="isPending">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="active"> Active </SelectItem>
                <SelectItem value="blocked"> Blocked </SelectItem>
                <SelectItem value="leftTheCompany"> Left the company </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="comment">
        <FormItem class="md:col-span-2">
          <FormLabel>Comment</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Comment..."
              class="resize-y"
              v-bind="componentField"
              :disabled="isPending"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex justify-end mt-4">
      <Button type="submit" :loading="isPending"> Submit </Button>
    </div>
  </form>
</template>
