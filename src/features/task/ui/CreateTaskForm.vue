<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../../../entities/task/model/task.store'

import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'

const props = defineProps<{
  projectId: string
}>()

const title = ref('')
const taskStore = useTaskStore()

const submit = async () => {
  if (!title.value.trim()) return
  taskStore.createTaskOptimistic(title.value.trim(), props.projectId)
  title.value = ''
}
</script>

<template>
  <form @submit.prevent="submit">
    <input
      v-model="title"
      type="text"
      placeholder="Enter task title"
      class="border p-2 rounded w-full"
    />
    <app-btn
      :is-disabled="!!taskStore.isCreatingTask"
      :disabled="taskStore.isCreatingTask || title.trim() === ''"
    >
      Create Task
    </app-btn>
  </form>
</template>

<style lang="scss" scoped></style>
