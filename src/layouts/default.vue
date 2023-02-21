<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['\\']

watch(tildaKey, (v) => v && toggleDark())
const authorizationStore = useAuthorizationStore()
</script>

<template>
  <div
    class="layout layout-default flex flex-grow box-color__default--3 overflow-hidden"
  >
    <div class="layout-default__loading h-2 z-100">
      <NuxtLoadingIndicator />
    </div>

    <div
      id="teleport-layer--20"
      class="layout-default__teleport fixed right-0 left-0 flex w-full h-full relative z-20"
    ></div>

    <div
      id="teleport-layer--10"
      class="layout-default__teleport fixed right-0 left-0 flex w-full h-full relative z-20"
    ></div>

    <div
      v-if="authorizationStore.current"
      class="layout-default__current-user flex flex-col z-10"
    >
      <AuthorizationCurrent />
    </div>
    <div
      class="layout-default__left flex flex-row fixed top-0 left-0 bottom-0 z-3"
    >
      <div class="box-color__default--2 border-r">
        <PageSidebar />
      </div>
      <div
        class="layout-default__page flex flex-col items-start justify-items-stretch text-left z-0"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
