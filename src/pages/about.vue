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
  <div class="flex flex-col items-center p-10">
    <div class="flex flex-col text-gray-400 text-xs">
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <PageTitle> About Page</PageTitle>
    <button
      class="flex flex-col items-center text-green-500 text-2xl dark:text-green-300"
      @click.prevent="backendStore.getItems('/api/data/others')"
    >
      <i class="i-mdi:sync inline-block" />
    </button>
    <VirtualList
      key="data-virtuallist"
      class="flex flex-col items-center mt-4"
      :keeps="40"
      :page-mode="true"
      item-class="pb-4"
      :data-ids="dataIds"
      data-key="data-virtuallist"
      :data-getter="dataGetter"
      :data-component="DataItem"
      :estimate-size="90"
    />
    <NuxtLink class="text-xs mt-4 text-gray-500 dark:text-gray-300" to="/">
      <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
      <span>Index Page</span>
    </NuxtLink>
  </div>
</template>
