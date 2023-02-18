<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ObjectsItem, VirtualList } from '#components'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
  middleware: 'authorization',
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

async function handleLoadMore() {
  await objectsStore.getOthers()
}
</script>

<template>
  <div class="page page-objects-index w-full h-full">
    <div class="flex flex-row sticky box-color__default--2">
      <PageTitle>{{ t('objects.title') }}</PageTitle>
    </div>
    <VirtualList
      ref="listRef"
      key="page-objects-index-virtuallist"
      :keeps="50"
      :page-mode="true"
      :data-ids="objectsIds"
      :data-getter="objectGetter"
      :data-component="ObjectsItem"
      data-key="page-objects-index-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center gap-8 p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
      :estimate-size="800"
      item-class="mb-6"
    >
      <template #header>
        <div class="absolute flex flex-col gap-2 -right-16 bottom-8 z-10">
          <Button
            class="h-11"
            color="secondary"
            outline
            rounded="md"
            size="sm"
            @click.prevent="handleLoadMore"
          >
            <i class="i-carbon:download inline-block" />
          </Button>
          <Button
            class="h-11"
            color="fourth"
            outline
            rounded="md"
            size="sm"
            @click.prevent="handleScrollerClick"
          >
            <i class="i-carbon:arrow-down inline-block" />
          </Button>
        </div>
      </template>
      <!-- <template #footer>
        <div class="flex flex-row items-center w-full">test</div>
      </template> -->
    </VirtualList>
  </div>
</template>
