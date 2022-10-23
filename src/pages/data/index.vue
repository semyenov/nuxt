<script setup lang="ts">
import DataItem from '@/components/data/item.vue'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const backendStore = useBackendStore()
await backendStore.getItems('/api/data/items')

const dataIds = backendStore.itemsGetter('data')
const dataGetter = backendStore.itemGetter<{
  _id: string
  name: string
  height: string
}>('data')
</script>

<template>
  <div class="flex flex-col items-center p-10 gap-6">
    <PageTitle>Data Page</PageTitle>
    <VirtualList
      key="data-virtuallist"
      class="flex flex-col items-center gap-6"
      :keeps="40"
      :page-mode="true"
      wrap-class="flex flex-col"
      item-class="mb-4"
      :data-ids="dataIds"
      data-key="data-virtuallist"
      :data-getter="dataGetter"
      :data-component="DataItem"
      :estimate-size="90"
    >
      <template #header>
        <NuxtLink class="text-xs text-gray-500" un-dark="text-gray-300" to="/">
          <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
          <span>Index Page</span>
        </NuxtLink>
      </template>
      <template #footer>
        <div
          class="flex flex-row flex-wrap items-center gap-1 w-full justify-between"
        >
          <Button @click.prevent="backendStore.getItems('/api/data/others')">
            <i class="i-carbon:download inline-block" />
            <span>MORE</span>
          </Button>
          <span class="text-gray-400 font-medium" un-dark="text-gray-500">{{
            dataIds.length
          }}</span>
        </div>
      </template>
    </VirtualList>
  </div>
</template>
