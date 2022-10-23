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

const { data } = await useFetch('/api/data/id', {
  query: { id },
  key: id,
})
</script>

<template>
  <div
    v-if="data"
    class="page-data-id flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
  >
    <PageTitle>
      {{ `Data #${data._id} Page` }}
    </PageTitle>
    <DataItem :item="data" :index="0"></DataItem>
  </div>
</template>
