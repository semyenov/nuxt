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

const item = dataGetter(id)
</script>

<template>
  <div
    class="page-data-id flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
  >
    <div v-if="item">
      <PageTitle>
        {{ `Data #${item._id} Page` }}
      </PageTitle>
      <DataItem :item="item" :index="0" />
    </div>
  </div>
</template>
