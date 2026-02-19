<script setup lang="ts">
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'
import { useTaskStore } from '@/entities/task/model/task.store'
import { ref } from 'vue'

const messageStore = useMessageStore()
const modalStore = useModalStore()
const taskStore = useTaskStore()

const onDelete = async (id: string) => {
  modalStore.showModal('confirm')
  if (await modalStore.confirmModal()) {
    await taskStore.deleteTaskOptimistic(id)
    messageStore.showMessage('Task deleted', 'info')
    if (taskStore.error) {
      messageStore.showMessage(taskStore.error, 'error')
    }
  }
}
const viewedTask = ref('')
const onView = (title: string) => {
  if (viewedTask.value === title) {
    viewedTask.value = ''
  } else {
    viewedTask.value = title
  }
}

const props = defineProps<{
  id: string
  title: string
  isOptimistic?: boolean
}>()
</script>

<template>
  <li
    @click="onView(props.title)"
    class="flex items-center justify-between gap-4 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition overflow-hidden"
  >
    <p :title="props.title" class="text-zinc-700 max-w-1/2 sm:max-w-5/6 wrap-break-word">
      <span class="transition-all" :class="viewedTask !== props.title ? 'line-clamp-1' : ''">{{
        props.title
      }}</span>
    </p>
    <div class="flex gap-4">
      <button
        title="delete"
        @click.self="onDelete(props.id)"
        :disabled="props.isOptimistic"
        class="text-red-500 hover:text-red-600 text-sm font-medium transition p-1"
      >
        X
      </button>
    </div>
  </li>
</template>

<style lang="css" scoped></style>
