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
  <div
    class="page-data-index flex flex-col items-center gap-8 p-10 w-full max-w-200"
  >
    <PageTitle>Data Page</PageTitle>
    <VirtualList
      key="data-virtuallist"
      class="flex flex-col items-center w-full"
      :keeps="40"
      :page-mode="true"
      wrap-class="flex flex-col w-full"
      item-class="mb-8"
      :data-ids="dataIds"
      data-key="data-virtuallist"
      :data-getter="dataGetter"
      :data-component="DataItem"
      :estimate-size="90"
    >
      <template #footer>
        <div
          class="flex flex-row flex-wrap items-center gap-1 w-full justify-center"
        >
          <Button
            color="gray"
            size="sm"
            @click.prevent="backendStore.getItems('/api/data/others')"
          >
            <i class="i-carbon:download inline-block" />
            <span>MORE</span>
          </Button>
        </div>
      </template>
    </VirtualList>
  </div>
</template>
