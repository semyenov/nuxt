<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['\\']

watch(tildaKey, (v) => v && toggleDark())
// const authorizationStore = useAuthorizationStore()
const winboxStore = useWinboxStore()
</script>

<template>
  <div
    class="layout layout-default flex flex-grow overflow-hidden box-color__default--3"
  >
    <div class="layout-default__loading z-100 h-2">
      <NuxtLoadingIndicator />
    </div>

    <div
      v-if="winboxStore.windows.size > 0"
      class="layout-default__current-user fixed bottom-0 z-10 flex flex-col border p-4 box-color__default--2"
    >
      <template v-for="[key, w] in winboxStore.windows.entries()">
        <Winbox v-if="w" :key="key" :window="w"> {{ w }}</Winbox></template
      >
      <AuthorizationCurrent />
    </div>
    <div class="layout-default__left fixed bottom-0 left-0 top-0 flex flex-row">
      <div class="z-40 border-r box-color__default--2">
        <PageSidebar />
      </div>
      <div
        class="layout-default__page z-10 flex flex-col items-start justify-items-stretch text-left"
      >
        <slot />
      </div>
      <div
        id="teleport-layer--20"
        class="layout-default__teleport fixed relative left-0 right-0 z-20 flex"
      ></div>

      <div
        id="teleport-layer--10"
        class="layout-default__teleport fixed relative left-0 right-0 z-10 flex"
      ></div>
    </div>
  </div>
</template>
