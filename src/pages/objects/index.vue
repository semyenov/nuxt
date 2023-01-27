<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ObjectsItem, VirtualList } from '#components'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const { t } = useI18n()

const objectsStore = useObjectsStore()
const objectsIds = await objectsStore.itemsGetter
const objectGetter = objectsStore.itemGetter

const listRef = ref<InstanceType<typeof VirtualList> | null>(null)

const listScrollStep = 10
const listScrollIndex = ref(listScrollStep)

function handleScrollerClick() {
  if (!listRef.value) {
    return
  }

  if (listScrollIndex.value > objectsIds.value.length) {
    listRef.value.scrollToBottom()
    listScrollIndex.value = 0

    return
  }

  listRef.value.scrollToIndex(listScrollIndex.value)
  listScrollIndex.value += listScrollStep
}
</script>

<template>
  <div class="page page-data-index">
    <VirtualList
      ref="listRef"
      key="data-virtuallist"
      :keeps="50"
      :page-mode="true"
      :data-ids="objectsIds"
      :data-getter="objectGetter"
      :data-component="ObjectsItem"
      data-key="data-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
      :estimate-size="800"
      item-class="mb-8 w-40"
    >
      <template #header>
        <PageTitle>{{ t('objects.title') }}</PageTitle>
        <div class="fixed flex flex-col gap-4 right-8 bottom-8 z-10">
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
