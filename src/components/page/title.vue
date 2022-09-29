<script setup lang="ts">
const mouseStore = useMouseStore()
</script>

<template>
  <div class="flex flex-col items-center justify-between">
    <div
      class="flex flex-col text-gray-400 text-xs font-medium"
      un-dark="text-gray-500"
    >
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>
    <div class="flex flex-row items-start gap-2">
      <div
        class="text-4xl font-extrabold text-green-600"
        un-dark="text-green-500"
      >
        <slot />
      </div>
      <button
        class="i-carbon:sun dark:i-carbon:moon text-xl text-gray-500"
        un-dark="text-gray-400"
        @click="toggleDark()"
      />
    </div>
  </div>
</template>
