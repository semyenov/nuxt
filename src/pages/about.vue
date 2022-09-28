<script setup lang="ts">
import { useBackendStore } from '../store/backend'

import DataItem from '@/components/data/item.vue'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const mouseStore = useMouseStore()
const backendStore = useBackendStore()

await backendStore.getItems('/api/data/items')

const dataIds = backendStore.itemsGetter('data')
const dataGetter = backendStore.itemGetter<{ _id: string; name: string }>(
  'data'
)
</script>

<template>
  <VirtualList
    v-if="dataIds"
    key="data-virtuallist"
    class="flex flex-col p-10"
    item-class="pb-4"
    :keeps="300"
    :page-mode="true"
    :data-ids="dataIds"
    :data-getter="dataGetter"
    :data-component="DataItem"
    :estimate-size="93"
  >
    <template #header>
      <div class="flex flex-col text-gray-400 text-xs">
        {{ mouseStore.x }}:{{ mouseStore.y }}
      </div>
      <PageTitle> About Page</PageTitle>
      <PageProse
        >Hello, ${name}! Vue.js makes the animations and transitions incredibly
        easy to implement. So you should really use this opportunity to give a
        little spark to your application/website to shine. Nuxt.js already
        builds on the provided capabilities of Vue.js. It gives you a
        possibility to create a very simple transitions between the pages very
        fast and almost for no effort.</PageProse
      >
      <button
        class="flex flex-col items-center text-green-500 text-2xl dark:text-green-300 p-4"
        @click.prevent="backendStore.getItems('/api/data/others')"
      >
        <i class="i-mdi:sync inline-block" />
      </button>
    </template>
    <template #footer>
      <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/">
        <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
        <span>Index Page</span>
      </NuxtLink>
    </template>
  </VirtualList>
</template>
