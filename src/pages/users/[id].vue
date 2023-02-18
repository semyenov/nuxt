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
  <div class="page page-users-id">
    <div
      v-if="item"
      class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200"
    >
      <PageTitle v-if="item.info.first_name && item.info.last_name">
        {{ `# ${item.info.first_name} ${item.info.last_name} Page` }}
      </PageTitle>
      <UsersItem :item="item" :index="0" />
    </div>
  </div>
</template>
