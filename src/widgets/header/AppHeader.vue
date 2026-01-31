<script setup lang="ts">
import AppLogo from '@/shared/ui/app-logo/AppLogo.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex gap-1 justify-between px-10 py-4 bg-amber-50 border">
    <router-link to="/">
      <app-logo />
    </router-link>
    <p>I am header</p>
  </header>
</template>

<style lang="scss" scoped></style>
