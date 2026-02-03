<script setup lang="ts">
defineProps<{
  isDisabled: boolean
}>()
</script>

<template>
  <button
    class="mt-2 px-4 py-2 text-white rounded cursor-pointer inline-block w-fit"
    :class="isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'"
    type="submit"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
