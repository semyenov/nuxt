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

function scrollClickHandler() {
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
  <Winbox
    show
    teleport-id="teleport-layer--10"
    :params="{
      title: t('objects.title'),
      class: ['simple', 'border-l-none', 'wb-left', 'no-move', 'no-close'],
      index: 10,
      border: 0,
      top: 0,
      left: '45px',
      bottom: 0,
      right: '50%',
      height: '100%',
      minheight: '100%',
      width: '550px',
      minwidth: '500px',
      x: '45px',
      y: 'center',
    }"
  >
    <VirtualList
      ref="listComponent"
      :keeps="50"
      :page-mode="false"
      :data-ids="objectsIds"
      :data-getter="objectGetter"
      :data-component="ObjectsItem"
      data-key="page-objects-index-virtuallist"
      wrap-class="flex flex-col w-full"
      class="page page-objects-index flex flex-col items-center gap-8 p-6 flex-grow overflow-y-scroll scrollbar scrollbar-rounded max-h-full h-auto"
      :estimate-size="70"
      item-class="mb-6"
    >
      <!-- <template #header>
        <div class="absolute flex flex-col gap-2 right-16 bottom-20 z-10">
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
            @click.prevent="scrollClickHandler"
          >
            <i class="i-carbon:arrow-down inline-block" />
          </Button>
        </div>
      </template> -->
    </VirtualList>
  </Winbox>
</template>
