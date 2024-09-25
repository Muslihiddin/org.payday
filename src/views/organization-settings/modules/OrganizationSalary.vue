<script setup lang="ts">
import type { SalaryDayModel, OrganizationSalaryModel } from '../types'

import { useUpdateOrganizationOptions } from '../query/useEditOrganizationOptions'
import { useGetOrganizationOptions } from '../query/useGetOrganizationOptions'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
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

const props = defineProps<{
  data: OrganizationSalaryModel
}>()

const salaryDayOptions: SalaryDayModel[] = [
  'lastDay',
  'day1',
  'day2',
  'day3',
  'day4',
  'day5',
  'day6',
  'day7',
  'day8',
  'day9',
  'day10',
  'day11',
  'day12',
  'day13',
  'day14',
  'day15',
  'day16',
  'day17',
  'day18',
  'day19',
  'day20',
  'day21',
  'day22',
  'day23',
  'day24',
  'day25',
  'day26',
  'day27',
  'day28'
]

const formSchema = toTypedSchema(
  z.object({
    salaryDay: z.string(),
    advanceDay: z.string(),
    balanceLimit: z.number().min(0),
    advancePercent: z.number().min(0).max(100)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    salaryDay: props.data.salaryDay,
    advanceDay: props.data.advanceDay,
    balanceLimit: props.data.balanceLimit,
    advancePercent: props.data.advancePercent
  }
})

const { mutate, isPending } = useUpdateOrganizationOptions()
const { refetch } = useGetOrganizationOptions()

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...props.data,
    salaryDay: values.salaryDay as SalaryDayModel,
    advanceDay: values.advanceDay as SalaryDayModel,
    balanceLimit: values.balanceLimit,
    advancePercent: values.advancePercent
  }

  mutate(payload, {
    onSuccess: () => {
      toast.success('Settings updated successfully')
      refetch()
    }
  })
})
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="salaryDay">
      <FormItem>
        <FormLabel>Salary day</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger :disabled="isPending">
              <SelectValue placeholder="Select salary day" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="day in salaryDayOptions" :key="day" :value="day">
                {{ day }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>You need to select salary day here.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="advanceDay">
      <FormItem>
        <FormLabel>Advance day</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger :disabled="isPending">
              <SelectValue placeholder="Select advance day" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="day in salaryDayOptions" :key="day" :value="day">
                {{ day }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>You need to select advance day here.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="balanceLimit">
      <FormItem>
        <FormLabel>Balance limit</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter balance limit"
            v-bind="componentField"
            :disabled="isPending"
          />
        </FormControl>
        <FormDescription> You need to provide balance limit of your company. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="advancePercent">
      <FormItem>
        <FormLabel>Advance percent</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter advance percent"
            v-bind="componentField"
            :disabled="isPending"
          />
        </FormControl>
        <FormDescription> Here you can define how high advance percent can get. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" :loading="isPending"> Update </Button>
  </form>
</template>
