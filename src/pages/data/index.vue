<script setup lang="ts">
import { DataItem, VirtualList } from '#components'

import type { IData } from '@/types'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const dataStore = useDataStore()
const dataIds = await dataStore.itemsGetter
const dataGetter = dataStore.itemGetter

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
      :data-getter="dataGetter"
      :data-component="DataItem"
      data-key="data-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
      :estimate-size="350"
      item-class="mb-8"
    >
      <template #header>
        <PageTitle>Data Page</PageTitle>
        <div class="fixed flex flex-col gap-4 right-8 bottom-8 z-10">
          <Button
            color="zinc"
            rounded="md"
            size="md"
            @click.prevent="dataStore.getOthers"
          >
            <i class="i-carbon:download inline-block h-6" />
          </Button>
          <Button
            color="blue"
            rounded="md"
            size="md"
            @click.prevent="handleScrollerClick"
          >
            <i class="i-carbon:arrow-down inline-block h-6" />
          </Button>
        </div>
      </template>
      <!-- <template #footer>
        <div class="flex flex-row items-center w-full">

        </div>
      </template> -->
    </VirtualList>
  </div>
</template>
