<script setup lang="ts">
import type { EmployeesJSON } from '../types'

import { ref } from 'vue'
import { read, utils } from 'xlsx'
import { UploadCloudIcon, FileSpreadsheetIcon, Trash2Icon } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PreviewTable } from '../modules'

const previewExcelData = ref<EmployeesJSON[] | []>([])

const previewFile = ref<File | null>(null)
const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files) return

  const file = files[0]
  previewFile.value = file

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer)
    const workbook = read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = utils.sheet_to_json(worksheet) as EmployeesJSON[]
    previewExcelData.value = json
  }
}

const clearExcel = () => {
  previewExcelData.value = []
  previewFile.value = null
}
</script>

<template>
  <header class="mb-6">
    <h2
      class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Upload employees
    </h2>
  </header>
  <div>
    <div v-if="!previewExcelData.length" class="max-w-[600px]">
      <p class="mb-2 text-muted-foreground">Upload modified excel file</p>
      <div class="relative border border-primary border-dashed rounded-lg bg-muted">
        <div
          class="absolute flex flex-col justify-center items-center gap-y-3 my-10 top-0 bottom-0 left-0 right-0"
        >
          <UploadCloudIcon />
          <p>Drag & drop or click to choose file</p>
        </div>
        <Input
          class="h-64 max-w-[600px] cursor-pointer opacity-0"
          type="file"
          accept=".xlsx"
          @change="handleFileUpload"
        />
      </div>
    </div>
    <div v-else>
      <p class="mb-2">Now you can check your uploaded file and submit it</p>
      <div class="flex items-center justify-between border rounded bg-muted p-3 max-w-[600px]">
        <div class="flex items-center">
          <FileSpreadsheetIcon />
          <p class="ml-2">{{ previewFile!.name }}</p>
        </div>
        <Button size="icon" variant="ghost" @click="clearExcel">
          <Trash2Icon />
        </Button>
      </div>

      <PreviewTable :data="previewExcelData" />
    </div>
  </div>
</template>

<style scoped></style>
