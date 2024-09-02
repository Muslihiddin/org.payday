<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useRoute } from "vue-router";
import { ChevronLeftIcon } from "@radix-icons/vue";

import { buttonVariants, Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { NavProps } from "..";

defineProps<NavProps>();
const emit = defineEmits(["on-toggle-sidebar"]);
const toggleSidebar = () => emit("on-toggle-sidebar");

const route = useRoute();
const isActive = (location: string) => {
  return route.name === location;
};
</script>

<template>
  <aside
    :data-collapsed="isCollapsed"
    class="group min-h-screen px-4 py-6 pt-3 border-r flex flex-col fixed"
  >
    <div v-if="isCollapsed" class="flex justify-center mb-6">
      <img src="/logo.svg" alt="payday" class="w-8" />
    </div>
    <div v-else class="flex justify-center mb-6">
      <img src="/logo_large.svg" alt="payday" class="w-[110px]" />
    </div>

    <TooltipProvider>
      <nav
        class="flex flex-col h-full gap-y-1 duration-200 transition-all flex-1"
      >
        <template v-for="nav in links" :key="nav.name">
          <Tooltip v-if="isCollapsed" :delay-duration="0">
            <TooltipTrigger as-child>
              <RouterLink
                :to="{ name: nav.location }"
                :class="{
                  [cn(buttonVariants({ variant: 'ghost', size: 'icon' }))]:
                    !isActive(nav.location),
                  [cn(buttonVariants({ variant: 'default', size: 'icon' }))]:
                    isActive(nav.location),
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
              [cn(buttonVariants({ variant: 'ghost' }), 'justify-start')]:
                !isActive(nav.location),
              [cn(buttonVariants({ variant: 'default' }), 'justify-start')]:
                isActive(nav.location),
            }"
          >
            <component :is="nav.icon" :size="22" />
            <p class="text-base">{{ nav.name }}</p>
          </RouterLink>
        </template>
      </nav>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon" @click="toggleSidebar">
            <ChevronLeftIcon :class="{ 'rotate-180': isCollapsed }" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </aside>
</template>
