<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { FilePlus2Icon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { utils, writeFile } from 'xlsx'
import excelTemplate from '@/assets/excel-templates/employees.json'

const router = useRouter()
const loading = ref(false)
const downloadTemplate = async () => {
  loading.value = true

  const worksheet = utils.json_to_sheet(excelTemplate)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, 'Employees')
  writeFile(workbook, 'Xodimlar.xlsx', { compression: true })

  router.push({ name: 'employees-upload' })

  loading.value = false
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default" size="icon" class="mr-4" :loading="loading">
        <FilePlus2Icon />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Employees</DialogTitle>
        <DialogDescription>
          Download template, edit it by adding employees list and upload modified excel file on the
          next page.
        </DialogDescription>
      </DialogHeader>

      <Button size="lg" class="mt-6" :loading="loading" @click="downloadTemplate"
        >Download excel template</Button
      >
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
