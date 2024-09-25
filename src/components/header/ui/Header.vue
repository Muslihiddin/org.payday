<script setup lang="ts">
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-vue-next'

defineProps<{
  isCollapsed: boolean
}>()
const emit = defineEmits(['on-toggle-sidebar'])

const toggleSidebar = () => emit('on-toggle-sidebar')
</script>

<template>
  <div
    class="border-b sticky top-0 h-14 w-full flex items-center bg-white"
    :class="{ 'pl-20': isCollapsed, 'pl-64': !isCollapsed }"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon" @click="toggleSidebar">
            <ChevronLeftIcon :size="16" :class="{ 'rotate-180': isCollapsed }" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
