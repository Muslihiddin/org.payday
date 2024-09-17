<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'

import * as z from 'zod'

import { toast } from 'vue-sonner'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-icons/vue'

import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import FormStep from './FormStep.vue'
import FormWizard from './FormWizard.vue'

// break down the validation steps into multiple schemas
const validationSchema = [
  toTypedSchema(
    z.object({
      firstName: z.string(),
      lastName: z.string()
    })
  ),
  toTypedSchema(
    z
      .object({
        phoneNumber: z.string().length(19, { message: 'Please enter valid phone number' }),
        password: z
          .string()
          .min(8, { message: 'Password must contain at least 8 character(s)' })
          .refine((value) => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase letter'
          })
          .refine((value) => /[a-z]/.test(value), {
            message: 'Password must contain at least one lowercase letter'
          })
          .refine((value) => /\d/.test(value), {
            message: 'Password must contain at least one number'
          }),
        confirmPassword: z.string()
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
      })
  )
]

const router = useRouter()
const isPasswordVisible = ref(false)
const isConfirmVisible = ref(false)

const cleanPhoneNumber = (maskedPhone: string) => {
  return maskedPhone.replace(/[^\d]/g, '') // Remove all non-digit characters
}

type RegisterUserPayload = {
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

import axios from 'axios'
import { AxiosError } from 'axios'

const loading = ref(false)
provide('FORM_SUBMITTING', loading)
const onSubmit = async (formData: RegisterUserPayload) => {
  try {
    loading.value = true
    formData.phoneNumber = cleanPhoneNumber(formData.phoneNumber)
    const res = await axios.post('/api/auth/register', formData)
    if (res.status === 200) {
      const requestId = res.data.requestId
      router.push({ name: 'auth-otp-confirmation', params: { id: requestId } })
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      toast.error(err.response?.data.error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
    <FormStep>
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem class="mb-5">
          <FormLabel>First name</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your first name"
              autocomplete="family-name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>Last name</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your last name"
              autocomplete="given-name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </FormStep>

    <FormStep>
      <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem class="mb-5">
          <FormLabel>Phone number</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your phone number"
              autocomplete="tel"
              maska="+998 (##) ###-##-##"
              inputmode="tel"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="mb-5">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                class="pr-10"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-bind="componentField"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
              <span
                class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              >
                <EyeClosedIcon v-if="!isPasswordVisible" class="size-5 text-muted-foreground" />
                <EyeOpenIcon v-else class="size-5 text-muted-foreground" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm password</FormLabel>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                class="pr-10"
                :type="isConfirmVisible ? 'text' : 'password'"
                v-bind="componentField"
                placeholder="Reenter your password"
                autocomplete="off"
              />
              <span
                class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
                @click="isConfirmVisible = !isConfirmVisible"
              >
                <EyeClosedIcon v-if="!isConfirmVisible" class="size-5 text-muted-foreground" />
                <EyeOpenIcon v-else class="size-5 text-muted-foreground" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </FormStep>
  </FormWizard>
</template>
