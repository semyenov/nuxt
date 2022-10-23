<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <div
    class="c-card divide-y border flex flex-col divide-blue-500 bg-opacity-80 border-blue-600 shadow-xl text-left min-w-75 shadow-blue-200 shadow-opacity-30 relative rounded-lg"
    un-dark="divide-blue-800 border-blue-700 shadow-opacity-20 shadow-blue-900"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow bg-blue-700 text-base leading-snug py-3 px-4 text-gray-50 gap-1 justify-between items-center font-bold last-rounded-b-lg first-rounded-t-lg"
      un-dark="border-blue-500 bg-blue-600 text-gray-900"
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
      class="flex flex-col bg-gray-100 text-xs text-gray-700 items-stretch break-normal px-4 py-2 last-rounded-b-lg first-rounded-t-lg"
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
