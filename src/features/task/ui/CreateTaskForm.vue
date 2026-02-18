<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../../../entities/task/model/task.store'

import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'
const messageStore = useMessageStore()

const props = defineProps<{
  projectId: string
}>()

const title = ref('')
const taskStore = useTaskStore()

const submit = async () => {
  if (!title.value.trim()) return
  taskStore.createTaskOptimistic(title.value.trim(), props.projectId)
  title.value = ''
  messageStore.showMessage('Task created', 'success')
}
</script>

<template>
  <div class="pt-4 border-t border-zinc-200">
    <form class="flex items-center gap-3" @submit.prevent="submit">
      <input
        v-model="title"
        type="text"
        placeholder="Enter task title"
        class="flex-1 border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <app-btn
        title="create"
        :is-disabled="!!taskStore.isCreatingTask || title.trim() === ''"
        :disabled="taskStore.isCreatingTask || title.trim() === ''"
      >
        Create Task
      </app-btn>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
