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

const dataStore = useDataStore()
const dataGetter = dataStore.itemGetter

const item = await dataGetter(id)
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
    </div>
  </div>
</template>
