<script setup lang="ts">
import AppHeader from '@/widgets/header/AppHeader.vue'
import AppFooter from '@/widgets/footer/AppFooter.vue'
import AppMessage from '@/shared/ui/app-message/AppMessage.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper flex flex-col min-h-screen relative">
    <app-header class="sticky top-0 z-1"></app-header>
    <main class="main px-1 py-8 gorw">
      I am main cointent
      <router-view />
    </main>
    <app-footer class="mt-auto bg-red-50 px-1 py-4"></app-footer>
    <app-message />
  </div>
</template>

<style scoped></style>
