<script setup lang="ts">
import { objectPick } from '@antfu/utils'

const authorizationStore = useAuthorizationStore()
const userFullName = computed(
  () =>
    authorizationStore.current &&
    Object.values(
      objectPick(authorizationStore.current.info, ['first_name', 'last_name'])
    ).join(' ')
)
</script>

<template>
  <div
    class="fixed right-0 top-0 inline-flex flex-row items-center border rounded-lb-xl border-r-none border-t-none bg-opacity-90 py-0.5 pl-3 pr-4 box-color__fourth--2"
    un-dark="  bg-opacity-75"
  >
    <i class="i-carbon:worship-jewish mr-2" />
    <span>{{ userFullName }}</span>
  </div>
</template>
