<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { createEmployee } from '../api'

import type { CreateEmployeeModel } from '../types'

import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

import { CheckIcon, CircleIcon, DotIcon } from '@radix-icons/vue'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { Textarea } from '@/components/ui/textarea'

const formSchema = [
  z.object({
    phoneNumber: z
      .string()
      .length(19, { message: 'Please enter valid phone number' })
      .default('+998'),
    inn: z.string().length(7, 'Please enter valid INN'),
    passportSerialNumber: z
      .string()
      .length(9, 'Value must start with two alphabetical characters and end with 7 digits'),
    pinfl: z.string().length(18, 'Invalid PINFL'),
    accountCredit: z.string().length(23, 'Account credit number is invalid'),
    mfo: z.string()
  }),
  z.object({
    cardNumber: z.string().length(19, 'Invalid card number'),
    status: z.string(),
    salary: z.number(),
    percentAllowed: z.number().min(0, "Can't be lowe than 0").max(100, "Can't be higher than 100"),
    comment: z.string()
  })
]

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Employees identifiers',
    description: 'Name, passport details, pinfl etc.'
  },
  {
    step: 2,
    title: 'Employees details',
    description: 'Card number, salary, status and so on'
  }
]

type FormValues = {
  phoneNumber: string
  inn: string
  passportSerialNumber: string
  pinfl: string
  accountCredit: string
  mfo: string
  cardNumber: string
  status: 'active' | 'blocked' | 'leftTheCompany'
  salary: number
  percentAllowed: number
  comment: string
}

const prepareValuesToSend = (values: FormValues): CreateEmployeeModel => {
  return {
    percentAllowed: values.percentAllowed,
    salary: values.salary,
    status: values.status,
    comment: values.comment,
    cardNumber: values.cardNumber.replace(/\s+/g, ''),
    identifiers: [
      {
        type: 'accountCredit',
        value: values.accountCredit.replace(/\s+/g, '')
      },
      {
        type: 'inn',
        value: values.inn
      },
      {
        type: 'mfo',
        value: values.mfo
      },
      {
        type: 'passportSerialNumber',
        value: values.passportSerialNumber
      },
      {
        type: 'phoneNumber',
        value: values.phoneNumber.replace(/\D+/g, '')
      },
      {
        type: 'pinfl',
        value: values.pinfl.replace(/\s+/g, '')
      }
    ]
  }
}

const router = useRouter()
const { isPending, mutate } = useMutation({
  mutationFn: createEmployee,
  onSuccess: () => {
    toast.success('New employee was added!')
    router.push({ name: 'employees-list' })
  }
})
const onSubmit = async (values: FormValues) => {
  const payload = prepareValuesToSend(values)
  mutate(payload)
}
</script>

<template>
  <div>
    <header class="flex items-center justify-between mb-6">
      <h2
        class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Adding new employee
      </h2>
    </header>

    <Form
      v-slot="{ meta, values, validate }"
      as=""
      keep-values
      :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
    >
      <Stepper
        v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
        v-model="stepIndex"
        class="block w-full"
      >
        <form
          @submit="
            (e) => {
              e.preventDefault()
              validate()

              if (stepIndex === steps.length && meta.valid) {
                onSubmit(values as FormValues)
              }
            }
          "
        >
          <div class="flex w-full flex-start gap-2">
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              class="relative flex w-full flex-col items-center justify-center"
              :step="step.step"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-foreground"
              />

              <StepperTrigger as-child>
                <Button
                  :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                  size="icon"
                  class="z-10 rounded-full shrink-0"
                  :class="[
                    state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                  ]"
                  :disabled="state !== 'completed' && !meta.valid"
                >
                  <CheckIcon v-if="state === 'completed'" class="size-5" />
                  <CircleIcon v-if="state === 'active'" />
                  <DotIcon v-if="state === 'inactive'" />
                </Button>
              </StepperTrigger>

              <div class="mt-5 flex flex-col items-center text-center">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step.title }}
                </StepperTitle>
                <StepperDescription
                  :class="[state === 'active' && 'text-primary']"
                  class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                >
                  {{ step.description }}
                </StepperDescription>
              </div>
            </StepperItem>
          </div>

          <div class="flex flex-col gap-4 mt-4">
            <template v-if="stepIndex === 1">
              <FormField v-slot="{ componentField }" name="phoneNumber">
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="+998 (##) ###-##-##" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="inn">
                <FormItem>
                  <FormLabel>INN</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="#######" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="passportSerialNumber">
                <FormItem>
                  <FormLabel>Passport Serial Number</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="@@#######" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="pinfl">
                <FormItem>
                  <FormLabel>PINFL</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="# ###### ### ### #" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="accountCredit">
                <FormItem>
                  <FormLabel>Account Credit</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="##### ##### ##### #####" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="mfo">
                <FormItem>
                  <FormLabel>MFO</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>

            <template v-if="stepIndex === 2">
              <FormField v-slot="{ componentField }" name="cardNumber">
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" maska="#### #### #### ####" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="status">
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status of employee" />
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

              <FormField v-slot="{ componentField }" name="salary">
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="percentAllowed">
                <FormItem>
                  <FormLabel>Percent allowed</FormLabel>
                  <FormControl>
                    <Input type="number" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="comment">
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>
          </div>

          <div class="flex items-center justify-between mt-4">
            <Button :disabled="isPrevDisabled" variant="outline" size="sm" @click="prevStep()">
              Back
            </Button>
            <div class="flex items-center gap-3">
              <Button
                v-if="stepIndex !== 2"
                :type="meta.valid ? 'button' : 'submit'"
                :disabled="isNextDisabled"
                size="sm"
                @click="meta.valid && nextStep()"
              >
                Next
              </Button>
              <Button v-if="stepIndex === 2" size="sm" type="submit" :loading="isPending">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Stepper>
    </Form>
  </div>
</template>
