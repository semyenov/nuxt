<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const { x, y } = useMouse()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 p-10 text-center">
    <div class="flex flex-col text-gray-400 text-xs">{{ x }}:{{ y }}</div>
    <div class="flex flex-col custom-shortcut">Index Page</div>
    <div class="flex flex-row gap-1 text-3xl">
      <!-- A basic anchor icon from Phosphor icons -->
      <div class="i-ph-anchor-simple-thin" />
      <!-- An orange alarm from Material Design Icons -->
      <div class="i-mdi-alarm text-orange-400 hover:text-blue-400" />
      <!-- A large Vue logo -->
      <div class="i-logos-vue text-5xl" />
      <!-- Sun in light mode, Moon in dark mode, from Carbon -->
      <div class="i-carbon-sun dark:i-carbon-moon" />
      <!-- Twemoji of laugh, turns to tear on hovering -->
      <div
        class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
      />
    </div>
  </div>
</template>
