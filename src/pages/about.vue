<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const mouseStore = useMouseStore()
const { data } = await useFetch('/api/test', {
  method: 'get',
  params: {
    name: 'Alexander',
  },
})
</script>

<template>
  <div class="flex gap-1 p-10">
    <div class="flex flex-col text-gray-400 text-xs">
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <Title>About Page</Title>
    <Prose>
      {{ data.text }}
    </Prose>
    <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/">
      <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
      <span>Index Page</span>
    </NuxtLink>
  </div>
</template>
