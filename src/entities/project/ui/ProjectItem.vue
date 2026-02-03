<script setup lang="ts">
import type { IProject } from '../model/project.types'
import { useProjectStore } from '../model/project.store'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'

const messageStore = useMessageStore()
const projectStore = useProjectStore()

defineProps<{
  data: IProject
  tag?: keyof HTMLElementTagNameMap
}>()

const onDelete = async (id: string) => {
  if (confirm('Do you want to delete this project?')) {
    await projectStore.deleteProjectOptimistic(id)

    if (projectStore.error) {
      messageStore.showMessage(projectStore.error, 'error')
    }
  }
}
</script>

<template>
  <component
    :is="tag || 'div'"
    class="project__item bg-amber-50 border border-red-200 p-2 overflow-hidden flex flex-col w-full pl-15 py-4"
  >
    <div class="project__info">
      <p class="project__title line-clamp-1 text-balance">Title: {{ data.title }}</p>
      <p class="project__descriptiion line-clamp-2 text-balance">
        Description: {{ data.description }}
      </p>
    </div>
    <router-link :to="`/projects/${data.id}`" class="hover:text-blue-500 mt-auto self-end pl-4 py-1"
      >View Details</router-link
    >
    <button @click.prevent="onDelete(data.id)">Delete</button>
  </component>
</template>

<style lang="css" scoped></style>
