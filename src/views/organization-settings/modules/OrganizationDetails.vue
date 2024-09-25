<script setup lang="ts">
import type { OrganizationModel } from '../types'

import { useDateFormat } from '@vueuse/core'
import { prettifyPhoneNumber } from '@/lib/utils'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { InfoIcon } from 'lucide-vue-next'

defineProps<{
  data: OrganizationModel
}>()
</script>

<template>
  <div class="mt-4">
    <div class="mb-4">
      <p class="font-medium text-muted-foreground mb-1">Organization title</p>
      <p>{{ data.name }}</p>
    </div>
    <div class="mb-4">
      <p class="font-medium text-muted-foreground mb-1">Phone number</p>
      <p>
        {{ data.phone ? prettifyPhoneNumber(data.phone) : 'Not provided' }}
      </p>
    </div>
    <div class="mb-4">
      <p class="font-medium text-muted-foreground mb-1">Registration date</p>
      <p>
        {{ data.registeredAt ? useDateFormat(data.registeredAt, 'DD MMMM YYYY') : 'Not provided' }}
      </p>
    </div>
    <div class="mb-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p class="font-medium text-muted-foreground mb-1 flex items-center">
              IFUT <InfoIcon :size="18" class="ml-1" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Iqtisodiy faoliyat turlari umumdavlat tasniflagichi</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{{ data.ifut }}</p>
    </div>
    <div class="mb-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p class="font-medium text-muted-foreground mb-1 flex items-center">
              DBIBT <InfoIcon :size="18" class="ml-1" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Davlat va xo`jalik boshqaruvi idoralarini belgilash tizimi</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{{ data.dbibt }}</p>
    </div>
    <div class="mb-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p class="font-medium text-muted-foreground mb-1 flex items-center">
              THSHT <InfoIcon :size="18" class="ml-1" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tashkiliy-huquqiy shakllar tasniflagichi</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{{ data.thsht }}</p>
    </div>
    <div class="mb-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p class="font-medium text-muted-foreground mb-1 flex items-center">
              STIR <InfoIcon :size="18" class="ml-1" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Soliq to`lovchining identifikatsiya raqami/INN</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{{ data.tin }}</p>
    </div>
  </div>
</template>
