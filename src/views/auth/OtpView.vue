<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

import axios from 'axios'
import { AxiosError } from 'axios'

import { toast } from 'vue-sonner'
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
  PinInputSeparator
} from '@/components/ui/pin-input'

const route = useRoute()
const requestId = route.params.id as string

const router = useRouter()
type Token = { accessToken: string; expireAt: string }
const saveTokenAndRedirect = ({ accessToken, expireAt }: Token) => {
  localStorage.setItem('token', accessToken)
  localStorage.setItem('tokenExpire', expireAt)
  router.push({ name: 'home' })
}

const value = ref<string[]>([])
const loading = ref(false)
const handleComplete = async (e: string[]) => {
  try {
    loading.value = true
    const payload = { requestId: requestId, code: e.join('') }
    const res = await axios.post('/api/auth/otp', payload)
    if (res.status === 200) {
      saveTokenAndRedirect(res.data)
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      toast.error(err.response?.data.code)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-3 lg:px-0">
    <div class="max-w-96 flex flex-col items-center">
      <h3 class="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight mb-2">OTP Confirmation</h3>
      <p class="text-center leading-7 mb-6">
        In the last step you need confirm authentication with OTP code sent to your phone number
      </p>

      <PinInput
        id="pin-input"
        v-model="value"
        placeholder="○"
        @complete="handleComplete"
        :disabled="loading"
      >
        <PinInputGroup class="gap-1">
          <template v-for="(id, index) in 6" :key="id">
            <PinInputInput class="rounded-md border" :index="index" />
            <template v-if="index !== 5">
              <PinInputSeparator />
            </template>
          </template>
        </PinInputGroup>
      </PinInput>
    </div>
  </div>
</template>
