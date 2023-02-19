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

const listComponent = ref<InstanceType<typeof VirtualList> | null>(null)

const listScrollStep = 10
const listScrollIndex = ref(listScrollStep)

function scrollerClickHandler() {
  if (!listComponent.value) {
    return
  }

  if (listScrollIndex.value > objectsIds.value.length) {
    listComponent.value.scrollToBottom()
    listScrollIndex.value = 0

    return
  }

  listComponent.value.scrollToIndex(listScrollIndex.value)
  listScrollIndex.value += listScrollStep
}

async function loadOthersHandler() {
  await objectsStore.getOthers()
}
</script>

<template>
  <div class="page page-objects-index w-full h-full">
    <div class="flex flex-row sticky box-color__default--2">
      <PageTitle>{{ t('objects.title') }}</PageTitle>
    </div>
    <VirtualList
      ref="listComponent"
      :keeps="50"
      :page-mode="true"
      :data-ids="objectsIds"
      :data-getter="objectGetter"
      :data-component="ObjectsItem"
      data-key="page-objects-index-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center gap-8 p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
      :estimate-size="70"
      item-class="mb-6"
    >
      <template #header>
        <div class="absolute flex flex-col gap-2 -right-16 bottom-28 z-10">
          <Button
            class="h-11"
            color="default"
            outline
            rounded="md"
            size="md"
            @click.prevent="loadOthersHandler"
          >
            <i class="i-carbon:download inline-block" />
          </Button>
          <Button
            class="h-11"
            color="default"
            outline
            rounded="md"
            size="md"
            @click.prevent="scrollerClickHandler"
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
