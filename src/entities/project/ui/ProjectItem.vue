<script setup lang="ts">
import type { IProject } from '../model/project.types'

defineProps<{
  data: IProject
  tag?: keyof HTMLElementTagNameMap
}>()
</script>

<template>
  <component :is="tag || 'div'" class="bg-amber-50 border border-red-200 p-2 overflow-hidden">
    <p>{{ data.name }}</p>
    <p>{{ data.description }}</p>
    <router-link :to="`/projects/${data.id}`">View Details</router-link>
  </component>
</template>

<style lang="scss" scoped></style>
А
