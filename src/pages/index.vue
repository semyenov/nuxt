<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const mouseStore = useMouseStore()
const { data } = await useFetch('/api/test')
</script>

<template>
  <div class="flex flex-col gap-1 p-10">
    <div class="flex flex-col text-gray-400 text-xs">
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <PageTitle>Index Page</PageTitle>
    <PageProse>{{ data.text }}</PageProse>
    <div class="flex flex-row gap-1 text-3xl justify-center mt-4">
      <div
        class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy"
      />
      <i class="i-mdi:alarm text-orange-400 hover:text-blue-400" />
      <i class="i-logos:vue text-6xl" />
      <NuxtLink to="/test" class="i-ph:anchor-simple" />
      <button class="i-carbon:sun dark:i-carbon:moon" @click="toggleDark()" />
    </div>
    <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/about">
      <span>About Page</span>
      <i class="i-carbon:arrow-right inline-block relative top-0.5 ml-1" />
    </NuxtLink>
  </div>
</template>
