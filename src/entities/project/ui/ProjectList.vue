<script setup lang="ts">
import ProjectItem from './ProjectItem.vue'
import type { IProject } from '../model/project.types'

defineProps<{
  projects: IProject[]
  tag?: keyof HTMLElementTagNameMap
}>()
</script>

<template>
  <component :is="tag || 'div'" class="flex gap-1 list-none counter-reset">
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
  top: 0;
  right: -0.15em;
  font: 4em sans-serif;
  opacity: 0.07;
}
</style>
