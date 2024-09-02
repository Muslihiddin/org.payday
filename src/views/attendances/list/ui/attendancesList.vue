<script setup lang="ts">
import { computed } from "vue";
import { useGetAttendances } from "../query/useGetAttendances";

const res = useGetAttendances({ page: 1, size: 20 });
const awd = computed(() => {
  console.log(res.data.value?.data.data);
  return "awd";
});
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Attendances
    </h2>
  </header>

  {{ awd }}
</template>

<style scoped></style>
