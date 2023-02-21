<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { UsersItem, VirtualList } from '#components'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
  middleware: 'authorization',
})

const { t } = useI18n()

const usersStore = useUsersStore()
const usersIds = await usersStore.itemsGetter
const usersGetter = usersStore.itemGetter

const listComponent = ref<InstanceType<typeof VirtualList> | null>(null)

const listScrollStep = 10
const listScrollIndex = ref(listScrollStep)

function scrollClickHandler() {
  if (!listComponent.value) {
    return
  }

  if (listScrollIndex.value > usersIds.value.length) {
    listComponent.value.scrollToBottom()
    listScrollIndex.value = 0

    return
  }

  listComponent.value.scrollToIndex(listScrollIndex.value)
  listScrollIndex.value += listScrollStep
}
</script>

<template>
  <Winbox
    show
    teleport-id="teleport-layer--10"
    :params="{
      title: t('users.title'),
      class: ['simple', 'wb-left', 'no-move', 'no-close', 'border-l-none'],
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
      key="page-users-index-virtuallist"
      :keeps="50"
      :page-mode="false"
      :data-ids="usersIds"
      :data-getter="usersGetter"
      :data-component="UsersItem"
      data-key="page-users-index-virtuallist"
      wrap-class="flex flex-col w-full"
      class="page page-users-index flex flex-col items-center gap-8 p-6 flex-grow overflow-y-scroll scrollbar scrollbar-rounded max-h-full h-auto"
      :estimate-size="70"
      item-class="mb-6"
    >
      <!-- <template #header>
        <div class="absolute flex flex-col gap-4 right-8 bottom-20 z-10">
          <Button
            class="h-11"
            color="default"
            outline
            rounded="full"
            size="md"
            @click="scrollClickHandler"
          >
            <i class="i-carbon:arrow-down inline-block" />
          </Button>
        </div>
      </template> -->
    </VirtualList>
  </Winbox>
</template>
