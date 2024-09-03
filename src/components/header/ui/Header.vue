<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrganizations } from "../query/useGetOrganizations";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
const isOpen = ref(false);
const router = useRouter();
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest(".dropdown-container")) {
    closeDropdown();
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});

const LogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  router.push("/auth/login");
};
const { data } = useGetOrganizations();
</script>

<template>
  <div
    class="border-b fixed pl-60 h-14 w-full flex items-center bg-white justify-end pr-5"
  >
    <DropdownMenu>
      <DropdownMenuTrigger
        class="flex items-center"
        @click.stop="toggleDropdown"
      >
        {{ data?.data?.name }}
        <component
          :is="isOpen ? ChevronUpIcon : ChevronDownIcon"
          class="w-5 h-5 ml-2"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent v-if="isOpen">
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem @click="LogOut">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
