<script setup lang="ts">
import { ref } from 'vue'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

const isCollapsed = ref(false)
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value)
</script>

<template>
  <main>
    <Sidebar :is-collapsed="isCollapsed" class="z-20" />

    <Header class="z-10" :is-collapsed="isCollapsed" @on-toggle-sidebar="toggleSidebar" />

    <div class="p-3" :class="{ 'ml-20': isCollapsed, 'ml-60': !isCollapsed }">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </main>
</template>
