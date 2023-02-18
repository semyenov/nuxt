<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['~']

watch(tildaKey, (v) => v && toggleDark())
const authorizationStore = useAuthorizationStore()
</script>

<template>
  <div class="layout-default w-full h-full">
    <div class="layout-default__loading h-2 z-3">
      <NuxtLoadingIndicator />
    </div>
    <div
      v-if="authorizationStore.current"
      class="layout-default__current-user flex flex-col z-1"
    >
      <AuthorizationCurrent />
    </div>
    <div class="layout-default__sidebar z-2">
      <PageSidebar />
    </div>
    <div
      class="layout-default__page flex flex-col items-center justify-center text-center"
    >
      <slot />
    </div>
  </div>
</template>
