<script setup lang="ts">
import type { WeekendsModel, OrganizationSalaryModel } from '../types'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useUpdateOrganizationOptions } from '../query/useEditOrganizationOptions'
import { useGetOrganizationOptions } from '../query/useGetOrganizationOptions'

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
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'vue-sonner'

const props = defineProps<{
  data: OrganizationSalaryModel
}>()

const weekdaysList: { id: WeekendsModel; label: string }[] = [
  {
    id: 'monday',
    label: 'Monday'
  },
  {
    id: 'tuesday',
    label: 'Tuesday'
  },
  {
    id: 'wednesday',
    label: 'Wednesday'
  },
  {
    id: 'friday',
    label: 'Friday'
  },
  {
    id: 'saturday',
    label: 'Saturday'
  },
  {
    id: 'sunday',
    label: 'Sunday'
  }
] as const
const hours = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23'
]
const minutes = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59'
]

const formSchema = toTypedSchema(
  z.object({
    weekends: z.array(z.string()),
    dayShiftWorkStartTime: z.string()
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    weekends: props.data.weekends ? props.data.weekends : []
  }
})

const { mutate, isPending } = useUpdateOrganizationOptions()
const { refetch } = useGetOrganizationOptions()

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...props.data,
    weekends: values.weekends as WeekendsModel[]
  }
  mutate(payload, {
    onSuccess: () => {
      toast.success('Weekends updated successfully')
      refetch()
    }
  })
})
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField name="weekends">
      <FormItem>
        <div class="mb-4">
          <FormLabel> Weekends </FormLabel>
          <FormDescription> Select the weekends. </FormDescription>
        </div>

        <FormField
          v-for="item in weekdaysList"
          v-slot="{ value, handleChange }"
          :key="item.id"
          type="checkbox"
          :value="item.id"
          :unchecked-value="false"
          name="weekends"
        >
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                :disabled="isPending"
                @update:checked="handleChange"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex gap-4">
      <FormField v-slot="{ componentField }" name="dayShiftWorkStartTime">
        <FormItem>
          <FormLabel>Hour</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger :disabled="isPending">
                <SelectValue placeholder="Select hour" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="hour in hours" :key="hour" :value="hour">
                  {{ hour }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="dayShiftWorkStartTime">
        <FormItem>
          <FormLabel>Minute</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger :disabled="isPending">
                <SelectValue placeholder="Select minute" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="minute in minutes" :key="minute" :value="minute">
                  {{ minute }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex justify-start mt-4">
      <Button type="submit" :loading="isPending"> Update </Button>
    </div>
  </form>
</template>
