<script setup lang="ts">
import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'

import { useProjectStore } from '@/entities/project/model/project.store'
import { ref } from 'vue'
import { useMessageStore } from '@/shared/ui/app-message/app-message.store'

const messageStore = useMessageStore()

const projectStore = useProjectStore()

const title = ref('')
const description = ref('')

const submit = async () => {
  if (!title.value.trim() || !description.value.trim()) return

  projectStore.createProjectOptimistic(title.value, description.value)
  messageStore.showMessage('Project created', 'success')

  title.value = ''
  description.value = ''
}
</script>

<template>
  <div class="rounded-xl bg-white p-6 w-full max-w-md">
    <p class="text-2xl font-semibold mb-4">Create project:</p>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <label class="flex flex-col gap-1 text-sm font-medium text-zinc-600"
        >Project title:
        <input
          v-model="title"
          class="border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          type="text"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-zinc-600"
        >Project description:
        <textarea
          v-model="description"
          class="border border-zinc-300 rounded-lg px-3 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          type="text"
        />
      </label>
      <app-btn
        :is-disabled="!title || !description"
        :disabled="projectStore.isCreatingProject || !title.trim() || !description.trim()"
        class="mt-2"
      >
        Create new project
      </app-btn>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
