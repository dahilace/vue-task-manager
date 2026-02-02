<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../model/task.store'

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
    <button
      :disabled="taskStore.isCreatingTask || title.trim() === ''"
      :class="
        taskStore.isCreatingTask
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      "
      type="submit"
      class="mt-2 px-4 py-2 text-white rounded cursor-pointer"
    >
      Create Task
    </button>
  </form>
</template>

<style lang="scss" scoped></style>
