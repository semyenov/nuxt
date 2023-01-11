<script setup lang="ts">
const keys = useMagicKeys()
const tildaKey = keys['~']

watch(tildaKey, (v) => {
  if (v) {
    toggleDark()
  }
})
</script>

<template>
  <div
    class="layout-default flex flex-col items-center justify-center text-center"
  >
    <slot />
  </div>
</template>
