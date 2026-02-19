<script setup lang="ts"></script>

<template>
  <main class="flex-1 py-12 px-4 bg-gray-100/80">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :key="route.fullPath" :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style lang="scss" scoped></style>
