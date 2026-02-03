<script setup lang="ts">
import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'
import { useProjectStore } from '@/entities/project/model/project.store'
import { ref } from 'vue'

const projectStore = useProjectStore()

const title = ref('')
const description = ref('')

const submit = async () => {
  if (!title.value.trim() || !description.value.trim()) return

  projectStore.createProjectOptimistic(title.value, description.value)

  title.value = ''
  description.value = ''
}
</script>

<template>
  <div>
    Create project:
    <form @submit.prevent="submit" class="flex flex-col gap-1" action="">
      <label>Project title: <input v-model="title" class="border" type="text" /></label>
      <label>Project description: <input v-model="description" class="border" type="text" /></label>
      <app-btn
        :is-disabled="!title || !description"
        :disabled="projectStore.isCreatingProject || !title.trim() || !description.trim()"
      >
        Create new project
      </app-btn>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
