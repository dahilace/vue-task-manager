<script setup lang="ts">
import { useMessageStore } from './app-message.store'
const messageStore = useMessageStore()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="messageStore.isVisible"
      class="fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white z-0"
      :class="{
        'bg-green-400': messageStore.type === 'success',
        'bg-red-400': messageStore.type === 'error',
        'bg-gray-500': messageStore.type === 'info',
      }"
    >
      {{ messageStore.text }}
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
