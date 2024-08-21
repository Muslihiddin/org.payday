<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { vMaska } from 'maska/vue'

import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  maska?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
const inputClasses = computed(() =>
  cn(
    'flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
    props.class
  )
)
</script>

<template>
  <input v-if="maska" v-model="modelValue" v-maska :data-maska="maska" :class="inputClasses" />
  <input v-else v-model="modelValue" :class="inputClasses" spellcheck="false" />
</template>
