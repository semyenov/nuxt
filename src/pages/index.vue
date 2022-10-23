<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const { data } = await useFetch('/api/test')
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-10">
    <PageTitle>Index Page</PageTitle>
    <NuxtLink class="text-xs text-gray-500" un-dark="text-gray-300" to="/data">
      <span>Data Page</span>
      <i class="i-carbon:arrow-right inline-block relative top-0.5 ml-1" />
    </NuxtLink>
    <PageProse v-if="data">{{ data.text }}</PageProse>
    <div class="flex flex-row gap-2 text-3xl justify-center">
      <div
        class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy"
      />
      <i class="i-mdi:alarm text-orange-400" un-hover="text-blue-400" />
      <i class="i-logos:vue text-6xl" />
      <NuxtLink to="/test" class="i-ph:anchor-simple" />
      <NuxtLink to="/test" class="i-ph:airplane-duotone" />
    </div>
  </div>
</template>
