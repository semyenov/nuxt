<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'authorization',
  // validate: (route) => validateUuid(route.params.id as string),
})

const route = useRoute('users-id')
const id = route.params.id as string

const objectsStore = useObjectsStore()
const objectGetter = objectsStore.itemGetter

const item = await objectGetter(id)
</script>

<template>
  <div class="page page-objects-id h-full w-full">
    <div v-if="item" class="sticky flex flex-row box-color__default--2">
      <PageTitle v-if="item.info.name">
        {{ `# ${item.info.name} Page` }}
      </PageTitle>
    </div>
    <div
      v-if="item"
      class="h-full max-h-screen max-w-200 w-full flex flex-col items-center gap-8 overflow-y-scroll p-6 scrollbar box-color__default--1 scrollbar-rounded"
    >
      <ObjectsItem :item="item" :index="0" />
    </div>
  </div>
</template>
