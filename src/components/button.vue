<script setup lang="ts">
const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    class="flex flex-row gap-1 items-center justify-center text-gray-500 bg-gray-100 border border-gray-300 px-2 py-0.5 rounded text-xs transition-200 hover:text-gray-600 hover:bg-gray-200 hover:border-gray-400"
    un-dark="bg-gray-800 text-gray-400 border-gray-700 hover:text-gray-300 hover:bg-gray-700 hover:border-gray-600"
  >
    <slot />
  </button>
</template>
