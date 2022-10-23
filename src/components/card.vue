<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <div
    class="component-card divide-y border flex flex-col divide-blue-400 bg-opacity-80 border-blue-600 shadow-xl text-left min-w-55 w-full shadow-blue-400 shadow-opacity-30 relative rounded-lg"
    un-dark="divide-blue-800 border-blue-600 shadow-opacity-30 shadow-blue-800"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow bg-blue-700 text-base leading-snug py-4 px-4 text-gray-50 gap-1 justify-between items-center font-bold last-rounded-b-lg first-rounded-t-lg"
      un-dark="border-blue-500 bg-blue-700 text-gray-200"
    >
      <slot name="header" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-blue-300 py-2 px-4 last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-300 bg-gray-800"
    >
      <slot name="panel" />
    </div>
    <div
      v-if="slots.default"
      class="flex flex-col bg-gray-100 text-xs text-gray-700 items-stretch break-normal p-4 last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-200 bg-gray-800"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="flex-grow flex flex-row w-full text-xs text-gray-500 gap-1 py-2 px-4 last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-400 bg-gray-900"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
