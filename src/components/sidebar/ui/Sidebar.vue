<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useRoute } from 'vue-router'
import { SettingsIcon } from 'lucide-vue-next'
import { useGetOrganization } from '@/views/organization-settings/query/useGetOrganization'

import { links } from './links'

import { buttonVariants } from '@/components/ui/button'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import type { NavProps } from '..'

defineProps<NavProps>()

const route = useRoute()
const isActive = (location: string) => {
  return route.name === location
}

const { data, isSuccess } = useGetOrganization()
</script>

<template>
  <aside
    :data-collapsed="isCollapsed"
    class="group min-h-screen px-4 py-10 pt-3 border-r flex flex-col fixed bg-white"
  >
    <div v-if="isCollapsed" class="flex justify-center mb-6">
      <img src="/logo.svg" alt="payday" class="w-8" />
    </div>
    <div v-else class="flex justify-center mb-6">
      <img src="/logo_large.svg" alt="payday" class="w-[110px]" />
    </div>

    <TooltipProvider>
      <nav class="flex flex-col h-full gap-y-1 duration-200 transition-all flex-1">
        <template v-for="nav in links" :key="nav.name">
          <Tooltip v-if="isCollapsed" :delay-duration="0">
            <TooltipTrigger as-child>
              <RouterLink
                :to="{ name: nav.location }"
                :class="{
                  [cn(buttonVariants({ variant: 'ghost', size: 'icon' }))]: !isActive(nav.location),
                  [cn(buttonVariants({ variant: 'default', size: 'icon' }))]: isActive(nav.location)
                }"
              >
                <component :is="nav.icon" :size="22" />
                <span class="sr-only">{{ nav.name }}</span>
              </RouterLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>{{ nav.name }}</span>
            </TooltipContent>
          </Tooltip>

          <RouterLink
            v-else
            :to="{ name: nav.location }"
            class="gap-x-3 min-w-48"
            :class="{
              [cn(buttonVariants({ variant: 'ghost' }), 'justify-start')]: !isActive(nav.location),
              [cn(buttonVariants({ variant: 'default' }), 'justify-start')]: isActive(nav.location)
            }"
          >
            <component :is="nav.icon" :size="22" />
            <p class="text-base">{{ nav.name }}</p>
          </RouterLink>
        </template>
      </nav>

      <template v-if="isSuccess">
        <Tooltip v-if="isCollapsed">
          <TooltipTrigger as-child>
            <RouterLink
              :to="{ name: 'organization-settings' }"
              :class="{
                [cn(buttonVariants({ variant: 'outline', size: 'icon' }))]:
                  !isActive('organization-settings'),
                [cn(buttonVariants({ variant: 'default', size: 'icon' }))]:
                  isActive('organization-settings')
              }"
            >
              <SettingsIcon :size="22" />
            </RouterLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Open organization settings</p>
          </TooltipContent>
        </Tooltip>

        <RouterLink
          v-else
          :to="{ name: 'organization-settings' }"
          :class="{
            [cn(buttonVariants({ variant: 'outline' }))]: !isActive('organization-settings'),
            [cn(buttonVariants({ variant: 'default' }))]: isActive('organization-settings')
          }"
        >
          <SettingsIcon :size="22" class="mr-2" />
          <p class="font-medium">{{ data!.data.data.name }}</p>
        </RouterLink>
      </template>
    </TooltipProvider>
  </aside>
</template>
