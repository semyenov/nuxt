<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const { data } = await useFetch('/api/test')
</script>

<template>
  <div
    class="page-index flex flex-col items-center gap-8 p-10 w-full max-w-200"
  >
    <PageTitle>Index Page</PageTitle>
    <PageProse v-if="data">{{ data.text }}</PageProse>
    <div class="flex flex-row gap-2 text-3xl justify-center">
      <div
        class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy"
      />
      <i class="i-mdi:alarm text-orange-400" un-hover="text-blue-400" />
      <i class="i-logos:vue text-6xl" />
      <NuxtLink
        to="/test"
        class="i-ph:anchor-simple text-gray-600"
        un-dark="text-gray-400"
      />
      <NuxtLink
        to="/test"
        class="i-ph:airplane-duotone text-blue-600"
        un-dark="text-blue-500"
      />
    </div>
  </div>
</template>
