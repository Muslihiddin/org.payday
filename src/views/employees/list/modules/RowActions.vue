<script setup lang="ts">
import type { EmployeeModel } from '../../types'

import { useRouter } from 'vue-router'

import { EyeIcon, PencilIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  employee: EmployeeModel
}>()

const router = useRouter()
const redirect = (val: 'view' | 'edit') => {
  const routeName = val === 'edit' ? 'employees-edit' : 'employees-detail'
  router.push({ name: routeName, params: { id: props.employee.id } })
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button size="icon" variant="ghost" @click="redirect('view')">
      <EyeIcon :size="19" />
    </Button>
    <Button size="icon" variant="ghost" @click="redirect('edit')">
      <PencilIcon :size="17" />
    </Button>
  </div>
</template>
