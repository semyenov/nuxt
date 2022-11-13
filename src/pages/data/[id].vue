<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
  validate: (route) => {
    return /^\d+$/.test(route.params.id as string)
  },
})

const route = useRoute()
const id = route.params.id as string

const backendStore = useBackendStore()
const dataGetter = backendStore.itemGetter<{
  _id: string
  name: string
  height: string
}>('data')

const item = await dataGetter(id)

function updateItem() {
  item.value.height = `${parseInt(item.value.height) + 50}px`

  // backendStore.store.get('data')!.set(id, {
  //   ...item.value,
  //   height: `${parseInt(item.value.height) + 50}px`,
  // })
}
</script>

<template>
  <div class="page page-data-id">
    <div
      v-if="item"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
    >
      <PageTitle>
        {{ `Data #${item._id} Page` }}
      </PageTitle>
      <DataItem :item="item" :index="0" />
      <Button @click="updateItem">Update item</Button>
    </div>
  </div>
</template>
