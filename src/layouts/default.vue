<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['\\']

watch(tildaKey, (v) => v && toggleDark())
// const authorizationStore = useAuthorizationStore()
const winboxStore = useWinboxStore()
</script>

<template>
  <div
    class="layout layout-default flex flex-grow box-color__default--3 overflow-hidden"
  >
    <div class="layout-default__loading h-2 z-100">
      <NuxtLoadingIndicator />
    </div>

    <div
      v-if="winboxStore.windows.size > 0"
      class="layout-default__current-user flex flex-col z-10 bottom-0 fixed p-4 box-color__default--2 border"
    >
      <template v-for="[key, w] in winboxStore.windows.entries()">
        <Winbox v-if="w" :key="key" :window="w"> {{ w }}</Winbox></template
      >
      <AuthorizationCurrent />
    </div>
    <div class="layout-default__left flex flex-row fixed top-0 left-0 bottom-0">
      <div class="box-color__default--2 border-r z-40">
        <PageSidebar />
      </div>
      <div
        class="layout-default__page flex flex-col items-start justify-items-stretch text-left z-10"
      >
        <slot />
      </div>
      <div
        id="teleport-layer--20"
        class="layout-default__teleport fixed right-0 left-0 flex relative z-20"
      ></div>

      <div
        id="teleport-layer--10"
        class="layout-default__teleport fixed right-0 left-0 flex relative z-10"
      ></div>
    </div>
  </div>
</template>
