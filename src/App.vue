<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <Toaster position="top-center" richColors />
  <RouterView />
  <VueQueryDevtools />
</template>
