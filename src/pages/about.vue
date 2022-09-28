<script setup lang="ts">
import { useBackendStore } from '../store/backend'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const mouseStore = useMouseStore()
const backendStore = useBackendStore()

useAsyncData(async () => {
  await backendStore.getItems<{ _id: string; name: string }>('/api/data/items')
})

const { data } = await useFetch('/api/test', {
  method: 'get',
  params: { name: 'Alexander' },
})

async function loadMoreHandler() {
  await backendStore.getItems<{ _id: string; name: string }>('/api/data/others')
}
</script>

<template>
  <div class="flex flex-col gap-1 p-10">
    <div class="flex flex-col text-gray-400 text-xs">
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <PageTitle> About Page</PageTitle>
    <PageProse>{{ data.text }}</PageProse>
    <button
      class="flex flex-col items-center text-green-500 text-2xl dark:text-green-300 p-4"
      @click.prevent="loadMoreHandler"
    >
      <i class="i-mdi:sync inline-block" />
    </button>
    <pre class="flex flex-col text-gray-400 text-xs text-left">{{
      backendStore.store.get('data')
    }}</pre>
    <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/">
      <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
      <span>Index Page</span>
    </NuxtLink>
  </div>
</template>
