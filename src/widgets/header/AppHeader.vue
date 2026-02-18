<script setup lang="ts">
import AppLogo from '@/shared/ui/app-logo/AppLogo.vue'
import AppBtn from '@/shared/ui/app-btn/AppBtn.vue'
import { RouterLink } from 'vue-router'
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'
const modalStore = useModalStore()
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
    <div class="flex items-center justify-between px-6 py-4">
      <p class="text-sm text-zinc-500">I am header</p>
      <router-link class="text-xl font-semibold text-zinc-800" to="/">
        <app-logo />
      </router-link>
      <app-btn @click.prevent="modalStore.showModal('create')">Add new project</app-btn>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
