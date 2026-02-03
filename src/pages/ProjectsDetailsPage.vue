<script setup lang="ts">
import { useTaskStore } from '@/features/task/model/task.store'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'

import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import TaskSkeleton from '@/features/task/ui/TaskSkeleton.vue'
import CreateTaskForm from '@/features/task/ui/CreateTaskForm.vue'

const props = defineProps<{
  id: string
}>()

const taskStore = useTaskStore()
const messageStore = useMessageStore()

const router = useRouter()

const projectId = props.id

if (Number.isNaN(projectId)) {
  router.replace('/404')
}

onMounted(() => {
  taskStore.fetchByProjectId(projectId)
})

watch(
  () => props.id,
  (newId) => {
    taskStore.clearTasks()
    taskStore.fetchByProjectId(newId)
  },
)
const onDelete = async (id: string) => {
  if (confirm('Do you want to delete this task?')) {
    await taskStore.deleteTaskOptimistic(id)

    if (taskStore.error) {
      messageStore.showMessage(taskStore.error, 'error')
    }
  }
}
</script>

<template>
  <div>
    <h2>Project Details Page {{ id }}</h2>
    <task-skeleton v-if="taskStore.isLoading" />
    <div v-else-if="taskStore.tasks.length === 0">Tasks are not found</div>
    <ul v-else>
      <li
        v-for="task in taskStore.tasks"
        :key="task.id"
        :class="{ 'opacity-50': task.isOptimistic }"
      >
        {{ task.title }} - {{ task.isCompleted }}
        <button
          @click="onDelete(task.id)"
          :disabled="task.isOptimistic"
          class="border rounded-2xl px-2 cursor-pointer"
        >
          X
        </button>
      </li>
    </ul>

    <create-task-form :projectId="props.id" />
  </div>
</template>

<style lang="scss" scoped></style>
