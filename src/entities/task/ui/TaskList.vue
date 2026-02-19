<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '../model/task.store'
const taskStore = useTaskStore()
</script>

<template>
  <ul class="space-y-3">
    <task-item
      :title="task.title"
      :id="task.id"
      :is-optimistic="task.isOptimistic"
      v-for="task in taskStore.tasks"
      :key="task.id"
    >
    </task-item>
  </ul>
</template>

<style lang="scss" scoped></style>
