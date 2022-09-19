<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const mouseStore = useMouseStore()
</script>

<template>
  <div class="flex gap-1 p-10">
    <div class="flex flex-col text-gray-400 text-xs">
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <Title>About Page</Title>
    <Prose>
      Vue.js makes the animations and transitions incredibly easy to implement.
      So you should really use this opportunity to give a little spark to your
      application/website to shine. Nuxt.js already builds on the provided
      capabilities of Vue.js. It gives you a possibility to create a very simple
      transitions between the pages very fast and almost for no effort.
    </Prose>
    <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/">
      <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
      <span>Index Page</span>
    </NuxtLink>
  </div>
</template>
