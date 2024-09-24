<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDeleteEmployee } from '../query/useDeleteEmployee'

import { Trash2Icon } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const open = ref(false)

const { isPending, mutate } = useDeleteEmployee()

const handleDelete = async () => {
  mutate(
    {
      id: props.id
    },
    {
      onSuccess: () => {
        open.value = false
        toast.success('User was successfully deleted')
        router.push({ name: 'employees-list' })
      },
      onError: ({ message }) => {
        toast.error(message)
      }
    }
  )
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button variant="outline">Delete user <Trash2Icon class="ml-2" :size="18" /></Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete user</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <p class="text-lg font-medium">This can't be undone. Delete this user?</p>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" :disabled="isPending">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" :loading="isPending" @click="handleDelete">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
