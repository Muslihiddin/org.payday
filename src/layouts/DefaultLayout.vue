<script setup lang="ts">
import { ref } from 'vue'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { DashboardIcon, PersonIcon } from '@radix-icons/vue'

import type { LinkProp } from '@/components/sidebar/Sidebar.vue'

const links: LinkProp[] = [
  {
    name: 'Dashboard',
    location: 'home',
    icon: DashboardIcon
  },
  {
    name: 'Employees',
    location: 'employees-list',
    icon: PersonIcon
  }
]

const isCollapsed = ref(false)
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value)
</script>

<template>
  <main class="flex">
    <Sidebar
      :links="links"
      :is-collapsed="isCollapsed"
      @on-toggle-sidebar="toggleSidebar"
      class="z-20"
    />

    <Header class="z-10" />
    <div class="mt-14 p-3 w-full" :class="{ 'ml-20': isCollapsed, 'ml-60': !isCollapsed }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>
