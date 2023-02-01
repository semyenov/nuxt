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
    class="fixed right-0 top-0 bg-amber-50 pr-4 pl-3 py-0.5 rounded-lb-xl inline-flex flex-row items-center text-amber-800 border border-r-none border-t-none border-amber-600 bg-opacity-90"
    un-dark="bg-amber-900 text-amber-50 border-amber-600 bg-opacity-75"
  >
    <i class="i-carbon:worship-jewish mr-2" />
    <span>{{ userFullName }}</span>
  </div>
</template>
