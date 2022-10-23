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
  <div v-if="data" class="flex flex-col items-center gap-6 p-10">
    <PageTitle>
      {{ `Data #${data._id} Page` }}
    </PageTitle>
    <NuxtLink class="text-xs text-gray-500" un-dark="text-gray-300" to="/data">
      <span>Data Page</span>
      <i class="i-carbon:arrow-right inline-block relative top-0.5 ml-1" />
    </NuxtLink>
    <DataItem :item="data" :index="0"></DataItem>
  </div>
</template>
