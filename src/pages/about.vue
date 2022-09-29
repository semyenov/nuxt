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
  <div class="flex flex-col items-center p-10 gap-4">
    <PageTitle>About Page</PageTitle>
    <VirtualList
      key="data-virtuallist"
      class="flex flex-col items-center gap-6"
      :keeps="40"
      :page-mode="true"
      wrap-class="flex flex-col gap-4"
      :data-ids="dataIds"
      data-key="data-virtuallist"
      :data-getter="dataGetter"
      :data-component="DataItem"
      :estimate-size="90"
    >
      <template #header>
        <button
          class="flex flex-row gap-1 items-center justify-center text-gray-500 bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs"
          un-dark="bg-gray-800 text-gray-400 border-gray-600"
          @click.prevent="backendStore.getItems('/api/data/others')"
        >
          <i class="i-carbon:download inline-block" />
          <span>{{ dataIds.length }}</span>
        </button>
      </template>
      <template #footer>
        <NuxtLink class="text-xs text-gray-500" un-dark="text-gray-300" to="/">
          <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
          <span>Index Page</span>
        </NuxtLink>
      </template>
    </VirtualList>
  </div>
</template>
