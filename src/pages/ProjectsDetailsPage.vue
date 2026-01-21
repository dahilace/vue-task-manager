<script setup lang="ts">
import { useTaskStore } from '@/features/task/model/task.store'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import TaskSkeleton from '@/features/task/model/ui/TaskSkeleton.vue'
import CreateTaskForm from '@/features/task/model/ui/CreateTaskForm.vue'

const props = defineProps<{
  id: string
}>()

const taskStore = useTaskStore()
const router = useRouter()

const projectId = Number(props.id)

if (Number.isNaN(projectId)) {
  router.replace('/404')
}
// else {
//   taskStore.setCurrentProjectId(projectId)
// }

onMounted(() => {
  taskStore.fetchByProjectId(projectId)
})

watch(
  () => props.id,
  (newId) => {
    taskStore.clearTasks()
    taskStore.fetchByProjectId(Number(newId))
  },
)
</script>

<template>
  <div>
    <h2>Project Details Page {{ id }}</h2>
    <task-skeleton v-if="taskStore.isLoading" />
    <div v-else-if="taskStore.error">Error loading tasks: {{ taskStore.error }}</div>
    <div v-else-if="taskStore.tasks.length === 0">Tasks are not found</div>
    <ul v-else>
      <li v-for="task in taskStore.tasks" :key="task.id">
        {{ task.title }} - {{ task.isCompleted }}
      </li>
    </ul>

    <create-task-form />
  </div>
</template>

<style lang="scss" scoped></style>
