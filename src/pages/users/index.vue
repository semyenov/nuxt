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

function handleScrollerClick() {
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
  <div class="page page-users-index w-full h-full">
    <Winbox
      title="TEST"
      :params="{
        left: 20,
        right: '50%',
        height: '100%',
        x: 'left',
        y: 'center',
      }"
      init
    >
      <div class="flex flex-row sticky box-color__default--2">
        <PageTitle>{{ t('users.title') }}</PageTitle>
      </div>
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
        class="flex flex-col items-center gap-8 p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
        :estimate-size="70"
        item-class="mb-6"
      >
        <template #header>
          <div class="absolute flex flex-col gap-4 -right-16 bottom-28 z-10">
            <Button
              class="h-11"
              color="default"
              outline
              rounded="md"
              size="md"
              @click.prevent="handleScrollerClick"
            >
              <i class="i-carbon:arrow-down inline-block" />
            </Button>
          </div>
        </template>
      </VirtualList>
    </Winbox>
  </div>
</template>
