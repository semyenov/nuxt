<script setup lang="ts">
import { DataItem, VirtualList } from '#components'

import type { IData } from '@/types'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const backendStore = useBackendStore()
const dataIds = await backendStore.itemsGetter('data')
const dataGetter = backendStore.itemGetter<IData>('data')

const listRef = ref<InstanceType<typeof VirtualList> | null>(null)

const listScrollStep = 10
let listScrollIndex = listScrollStep

function handleScrollerClick() {
  if (listScrollIndex > dataIds.value.length) {
    listRef.value!.scrollToBottom()
    listScrollIndex = 0
    return
  }

  listRef.value!.scrollToIndex(listScrollIndex)
  listScrollIndex += listScrollStep
}
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
          color="blue"
          rounded="md"
          size="md"
          class="fixed right-8 bottom-8"
          @click.prevent="handleScrollerClick"
        >
          <i class="i-carbon:arrow-down inline-block h-6" />
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
