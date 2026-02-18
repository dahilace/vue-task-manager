<script setup lang="ts">
import { useModalStore } from '@/shared/ui/app-modal/app-modal.store'
import AppModal from '@/shared/ui/app-modal/AppModal.vue'
import CreateProjectForm from '@/features/project/ui/CreateProjectForm.vue'
import AppConfirm from '@/shared/ui/app-confirm/AppConfirm.vue'
import { computed } from 'vue'
const modalStore = useModalStore()

const modalComponent = computed(() => {
  switch (modalStore.modalState) {
    case 'confirm':
      return AppConfirm
    case 'create':
      return CreateProjectForm
    default:
      return null
  }
})
</script>

<template>
  <app-modal v-if="modalComponent">
    <component :is="modalComponent"></component>
  </app-modal>
</template>

<style lang="scss" scoped></style>
