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

const listRef = ref<InstanceType<typeof VirtualList> | null>(null)

const listScrollStep = 10
const listScrollIndex = ref(listScrollStep)

function handleScrollerClick() {
  if (!listRef.value) {
    return
  }

  if (listScrollIndex.value > usersIds.value.length) {
    listRef.value.scrollToBottom()
    listScrollIndex.value = 0

    return
  }

  listRef.value.scrollToIndex(listScrollIndex.value)
  listScrollIndex.value += listScrollStep
}
</script>

<template>
  <div class="page page-users-index">
    <VirtualList
      ref="listRef"
      key="data-virtuallist"
      :keeps="50"
      :page-mode="true"
      :data-ids="usersIds"
      :data-getter="usersGetter"
      :data-component="UsersItem"
      data-key="data-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
      :estimate-size="800"
      item-class="mb-8"
    >
      <template #header>
        <PageTitle>{{ t('users.title') }}</PageTitle>
        <div class="fixed flex flex-col gap-4 right-8 bottom-8 z-10">
          <Button
            color="fourth"
            outline
            rounded="md"
            size="md"
            @click.prevent="handleScrollerClick"
          >
            <i class="i-carbon:arrow-down inline-block h-6" />
          </Button>
        </div>
      </template>
      <!-- <template #footer>
        <div class="flex flex-row items-center w-full">test</div>
      </template> -->
    </VirtualList>
  </div>
</template>
