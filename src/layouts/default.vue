<script setup lang="ts">
onKeyStroke(['d', 'D'], (e) => {
  e.preventDefault()
  toggleDark()
})
</script>

<template>
  <div
    class="layout-default flex flex-col items-center justify-center text-center"
  >
    <slot />
  </div>
</template>
