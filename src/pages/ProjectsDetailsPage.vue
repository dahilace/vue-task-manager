<script setup lang="ts">
import { useTaskStore } from '@/entities/task/model/task.store'

import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import TaskList from '@/entities/task/ui/TaskList.vue'

import TaskSkeleton from '@/features/task/ui/TaskSkeleton.vue'
import CreateTaskForm from '@/features/task/ui/CreateTaskForm.vue'

const props = defineProps<{
  id: string
}>()

const taskStore = useTaskStore()

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
</script>

<template>
  <div class="my-auto">
    <div class="max-w-3xl mx-auto space-y-8">
      <router-link class="text-sm text-blue-500 hover:underline" to="/projects"
        >Back to projects</router-link
      >
      <div class="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 sm:p-6 space-y-6 mt-10">
        <div>
          <h2 class="text-2xl font-semibold text-zinc-800">
            Project Details Page
            <span class="text-zinc-400 text-base font-normal">(id: {{ id }})</span>
          </h2>
          <p v-if="!taskStore.isLoading">Tasks ammount: {{ taskStore.tasks.length }}</p>
        </div>
        <task-skeleton v-if="taskStore.isLoading" />
        <div v-else-if="taskStore.tasks.length === 0">Tasks are not found</div>
        <task-list v-else />
        <create-task-form :project-id="id"></create-task-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
