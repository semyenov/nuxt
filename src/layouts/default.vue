<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['~']

watch(tildaKey, (v) => v && toggleDark())
</script>

<template>
  <div class="layout-default w-full h-full">
    <div class="layout-default__current-user flex flex-col z-1">
      <UsersCurrent />
    </div>
    <div
      class="layout-default__page flex flex-col items-center justify-center text-center"
    >
      <slot />
    </div>
  </div>
</template>
