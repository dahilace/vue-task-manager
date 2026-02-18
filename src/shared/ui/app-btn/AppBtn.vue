<script setup lang="ts">
defineProps<{
  isDisabled?: boolean
}>()
</script>

<template>
  <button
    class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg transition w-fit h-fit"
    :class="[
      isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600',
      { 'hover:bg-blue-600 active:scale-95': !isDisabled },
    ]"
    type="submit"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
