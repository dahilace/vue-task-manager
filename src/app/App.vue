<script setup lang="ts">
import AppHeader from '@/widgets/header/AppHeader.vue'
import AppFooter from '@/widgets/footer/AppFooter.vue'
import AppMessage from '@/shared/ui/app-message/AppMessage.vue'
import AppModalHost from '@/widgets/modal-host/AppModalHost.vue'
import AppMain from '@/widgets/main/AppMain.vue'
</script>

<template>
  <app-header></app-header>
  <app-main></app-main>
  <app-footer></app-footer>

  <app-message />
  <app-modal-host />
</template>

<style scoped></style>
