<script setup lang="ts">
import { useProjectStore } from '@/entities/project/model/project.store'
import { onMounted } from 'vue'
import ProjectList from '@/entities/project/ui/ProjectList.vue'
import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'

const modalStore = useModalStore()

const projectStore = useProjectStore()

onMounted(() => {
  projectStore.fetchProjects()
})
</script>

<template>
  <div class="my-10">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-semibold mb-6 text-center">Projects:</h2>
      <p v-if="!projectStore.isLoading">Projects amount: {{ projectStore.projects.length }}</p>
      <teleport to="#btns"
        ><app-btn
          @click.prevent="modalStore.showModal('create')"
          class="fixed bottom-24 right-8 z-50"
          >Add new project</app-btn
        >
      </teleport>
    </div>
    <div class="">
      <div v-if="projectStore.isLoading">Loading projects...</div>
      <div v-else-if="projectStore.error">Error loading projects: {{ projectStore.error }}</div>
      <div v-else-if="projectStore.projects.length === 0">Projects list is empty!</div>
      <div v-else class="max-w-6xl mx-auto px-6 space-y-8 w-full">
        <project-list tag="ul" :projects="projectStore.projects"></project-list>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
