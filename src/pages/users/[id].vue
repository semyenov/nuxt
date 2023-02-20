<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
  middleware: 'authorization',
  validate: (route) => validateUuid(route.params.id as string),
})

const route = useRoute('users-id')
const id = route.params.id as string

const usersStore = useUsersStore()
const usersGetter = usersStore.itemGetter

const item = await usersGetter(id)
</script>

<template>
  <div class="page page-users-id w-full h-full">
    <div v-if="item" class="flex flex-row sticky box-color__default--2">
      <PageTitle v-if="item.info.first_name && item.info.last_name">
        {{ `# ${item.info.first_name} ${item.info.last_name} Page` }}
      </PageTitle>
    </div>
    <div
      v-if="item"
      class="flex flex-col items-center gap-8 p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
    >
      <UsersItem :item="item" :index="0" />
    </div>
  </div>
</template>
