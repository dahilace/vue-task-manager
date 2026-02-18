<script setup lang="ts">
import ProjectItem from './ProjectItem.vue'
import type { IProject } from '../model/project.types'

defineProps<{
  projects: IProject[]
  tag?: keyof HTMLElementTagNameMap
}>()
</script>

<template>
  <component
    :is="tag || 'div'"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full list-none counter-reset"
  >
    <project-item
      tag="li"
      v-for="item in projects"
      :key="item.id"
      :data="item"
      class="counter-item"
    />
  </component>
</template>

<style lang="css" scoped>
.counter-reset {
  counter-reset: item;
}
.counter-item {
  counter-increment: item;
  position: relative;
}
.counter-item::before {
  content: counter(item);
  position: absolute;
  top: 12px;
  right: 12px;
  font: .8em sans-serif;
  opacity: 0.5;
}
</style>
