<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
  middleware: 'authorization',
  validate: (route) => validateUuid(route.params.id as string),
})

const route = useRoute('objects-id')
const id = route.params.id as string

const objectsStore = useObjectsStore()
const objectGetter = objectsStore.itemGetter

const item = await objectGetter(id)
</script>

<template>
  <div class="page page-objects-id w-full h-full">
    <div v-if="item" class="flex flex-row sticky box-color__default--2">
      <PageTitle v-if="item.info.name">
        {{ `# ${item.info.name} Page` }}
      </PageTitle>
    </div>
    <div
      v-if="item"
      class="flex flex-col items-center gap-8 p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200 box-color__default--1"
    >
      <ObjectsItem :item="item" :index="0" />
    </div>
  </div>
</template>
