<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { x, y } = useMouse()
</script>

<template>
  <div class="flex gap-1">
    <div class="flex flex-col text-gray-400 text-xs">{{ x }}:{{ y }}</div>
    <div class="flex flex-col custom-shortcut">About Page</div>
    <div class="prose dark:prose-invert">
      Vue.js makes the animations and transitions incredibly easy to implement.
      So you should really use this opportunity to give a little spark to your
      application/website to shine. Nuxt.js already builds on the provided
      capabilities of Vue.js. It gives you a possibility to create a very simple
      transitions between the pages very fast and almost for no effort.
    </div>
    <NuxtLink
      class="text-xs mt-4 text-gray-500 dark:text-gray-300"
      :to="{ path: '/' }"
    >
      <span class="i-carbon:arrow-left inline-block relative top-0.5"></span>
      Index Page</NuxtLink
    >
  </div>
</template>
