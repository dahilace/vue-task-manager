<script setup lang="ts">
import { useTaskStore } from '@/entities/task/model/task.store'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'

import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import TaskSkeleton from '@/features/task/ui/TaskSkeleton.vue'
import CreateTaskForm from '@/features/task/ui/CreateTaskForm.vue'

const props = defineProps<{
  id: string
}>()

const taskStore = useTaskStore()
const messageStore = useMessageStore()
const modalStore = useModalStore()

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
  modalStore.showModal('confirm')
  if (await modalStore.confirmModal()) {
    await taskStore.deleteTaskOptimistic(id)
    messageStore.showMessage('Task deleted', 'info')
    if (taskStore.error) {
      messageStore.showMessage(taskStore.error, 'error')
    }
  }
}
</script>

<template>
  <div class="my-auto">
    <div class="max-w-3xl mx-auto px-6 space-y-8">
      <router-link class="text-sm text-blue-500 hover:underline" to="/projects"
        >Back to projects</router-link
      >
      <div class="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 space-y-6 mt-10">
        <div>
          <h2 class="text-2xl font-semibold text-zinc-800">
            Project Details Page
            <span class="text-zinc-400 text-base font-normal">(id: {{ id }})</span>
          </h2>
          <p v-if="!taskStore.isLoading">Tasks ammount: {{ taskStore.tasks.length }}</p>
        </div>
        <task-skeleton v-if="taskStore.isLoading" />
        <div v-else-if="taskStore.tasks.length === 0">Tasks are not found</div>
        <ul class="space-y-3" v-else>
          <li
            :title="task.title"
            v-for="task in taskStore.tasks"
            :key="task.id"
            :class="{ 'opacity-50': task.isOptimistic }"
            class="flex items-center justify-between gap-6 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition overflow-hidden"
          >
            <p :title="task.title" class="text-zinc-700 max-w-5/6 wrap-break-word">
              <span class="line-clamp-3">{{ task.title }}</span>
              <!-- <span class="text-xs text-zinc-400 ml-2">{{ task.isCompleted }}</span> -->
            </p>

            <button
              title="delete"
              @click="onDelete(task.id)"
              :disabled="task.isOptimistic"
              class="text-red-500 hover:text-red-600 text-sm font-medium transition"
            >
              X
            </button>
          </li>
        </ul>
        <create-task-form :project-id="id"></create-task-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
