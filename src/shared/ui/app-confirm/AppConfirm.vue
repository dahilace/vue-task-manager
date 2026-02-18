<script setup lang="ts">
import { useModalStore } from '../app-modal/app-modal.store'
const modalStore = useModalStore()
</script>

<template>
  <div class="relative w-full max-w-md rounded-2xl p-8 space-y-6">
    <div class="space-y-2">
      <p class="text-lg font-semibold text-zinc-800">Delete item?</p>
      <p class="text-sm text-zinc-500">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    </div>
    <slot />
    <div class="flex justify-between gap-2 pt-4 border-t border-zinc-200">
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 transition p-2 -ml-2"
        @click.prevent="modalStore.resolveConfirm(true)"
      >
        Yes
      </button>
      <button
        class="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100 transition p-2 -mr-2"
        @click.prevent="modalStore.resolveConfirm(false)"
      >
        No
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
