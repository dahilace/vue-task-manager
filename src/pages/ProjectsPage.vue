<script setup lang="ts">
import { useProjectStore } from '@/features/project/model/project.store'
import { onMounted } from 'vue'
import ProjectList from '@/entities/project/ui/ProjectList.vue'

const projectStore = useProjectStore()

onMounted(() => {
  projectStore.fetchProjects()
})
</script>

<template>
  <div>
    <h2>Projects</h2>

    <div v-if="projectStore.isLoading">Loading projects...</div>
    <div v-else-if="projectStore.error">Error loading projects: {{ projectStore.error }}</div>
    <div v-else-if="projectStore.projects.length === 0">Projects list is empty!</div>
    <div v-else>
      <project-list tag="ul" :projects="projectStore.projects"></project-list>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
