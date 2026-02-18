<script setup lang="ts">
import type { IProject } from '../model/project.types'

import { useProjectStore } from '../model/project.store'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'

const messageStore = useMessageStore(),
  projectStore = useProjectStore(),
  modalStore = useModalStore()

defineProps<{
  data: IProject
  tag?: keyof HTMLElementTagNameMap
}>()

const onDelete = async (id: string) => {
  modalStore.showModal('confirm')
  if (await modalStore.confirmModal()) {
    await projectStore.deleteProjectOptimistic(id)
    messageStore.showMessage('Project deleted', 'info')
    if (projectStore.error) {
      messageStore.showMessage(projectStore.error, 'error')
    }
  }
}
</script>

<template>
  <component
    :is="tag || 'div'"
    class="project__item bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 flex flex-col hover:shadow-xl transition w-full min-h-50"
  >
    <div class="project__info space-y-2 mb-4">
      <h3
        :title="data.title"
        class="project__title font-semibold text-lg line-clamp-1 text-balance wrap-break-word"
      >
        {{ data.title }}
      </h3>
      <p
        :title="data.description"
        class="project__descriptiion text-zinc-500 text-sm line-clamp-3 text-balance wrap-break-word"
      >
        {{ data.description }}
      </p>
    </div>
    <div class="flex justify-between gap-2 mt-auto">
      <router-link
        :to="`/projects/${data.id}`"
        class="btn btn--info text-blue-500 text-sm whitespace-nowrap hover:underline p-2 -ml-2"
        >View Details</router-link
      >
      <button
        @click.prevent="onDelete(data.id)"
        class="btn btn--delete text-sm text-red-500 hover:text-red-600 font-medium hover:underline p-2 -mr-2"
      >
        Delete
      </button>
    </div>
  </component>
</template>

<style lang="css" scoped>
.project__item:has(.btn--info:hover).project__item::before {
  color: blue;
}
.project__item:has(.btn--info:hover) {
  background-color: color-mix(in srgb, blue 5%, transparent);
}
.project__item:has(.btn--delete:hover).project__item::before {
  color: red;
}
.project__item:has(.btn--delete:hover) {
  background-color: color-mix(in srgb, red 5%, transparent);
}
</style>
