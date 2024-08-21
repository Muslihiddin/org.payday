<script setup lang="ts">
import { useRouter } from 'vue-router'
import { clearLoginToken } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const router = useRouter()
const logout = () => {
  clearLoginToken()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex justify-end">
    <Button @click="logout">Logout</Button>
  </div>
</template>
