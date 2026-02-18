<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useModalStore } from './app-modal.store'
const modalStore = useModalStore()

const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') modalStore.closeModal()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onEsc)
})
</script>

<template>
  <Teleport to="#modals">
    <Transition name="fade">
      <div
        v-if="modalStore.isOpen"
        class="fixed inset-0 z-500 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        @click.self="modalStore.closeModal()"
      >
        <div
          class="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95"
        >
          <button
            @click="modalStore.closeModal()"
            class="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 text-lg transition"
            type="button"
          >
            [X]
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
