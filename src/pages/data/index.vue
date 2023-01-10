<script setup lang="ts">
import type { IData } from '@/types'
import DataItem from '@/components/data/item.vue'
import VirtualList from '@/components/virtual/list.vue'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const backendStore = useBackendStore()
const dataIds = await backendStore.itemsGetter('data')
const dataGetter = backendStore.itemGetter<IData>('data')

const listRef = ref<InstanceType<typeof VirtualList> | null>(null)
</script>

<template>
  <div class="page page-data-index">
    <VirtualList
      ref="listRef"
      key="data-virtuallist"
      :keeps="20"
      :page-mode="true"
      :data-ids="dataIds"
      data-key="data-virtuallist"
      :data-getter="dataGetter"
      :data-component="DataItem"
      :estimate-size="350"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
      wrap-class="flex flex-col w-full"
      item-class="mb-8"
    >
      <template #header>
        <PageTitle>Data Page</PageTitle>
        <Button
          color="red"
          rounded="md"
          size="md"
          @click.prevent="listRef!.scrollToIndex(5000)"
        >
          <i class="i-carbon:arrow-down inline-block h-6" />
          GOTO 5000
        </Button>
      </template>
      <template #footer>
        <div class="flex flex-row items-center w-full">
          <Button
            color="zinc"
            size="md"
            rounded="full"
            @click.prevent="backendStore.getItems(['data', 'others'])"
          >
            <i class="i-carbon:download inline-block h-6" />
          </Button>
        </div>
      </template>
    </VirtualList>
  </div>
</template>
