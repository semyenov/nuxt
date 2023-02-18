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
  <div class="page page-objects-id">
    <div
      v-if="item"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
    >
      <PageTitle v-if="item.info.name">
        {{ `# ${item.info.name} Page` }}
      </PageTitle>
      <ObjectsItem :item="item" :index="0" />
    </div>
  </div>
</template>
