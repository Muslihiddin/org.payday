<script setup lang="ts">
import { ref } from "vue";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { LayoutDashboardIcon, Users2Icon, CoinsIcon } from "lucide-vue-next";

import type { LinkProp } from "@/components/sidebar";

const links: LinkProp[] = [
  {
    name: "Dashboard",
    location: "home",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Employees",
    location: "employees-list",
    icon: Users2Icon,
  },
  {
    name: "Payments",
    location: "payments-list",
    icon: CoinsIcon,
  },
];

const isCollapsed = ref(false);
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);
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
    <div
      class="mt-14 p-3 w-full"
      :class="{ 'ml-20': isCollapsed, 'ml-60': !isCollapsed }"
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </main>
</template>
