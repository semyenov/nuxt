<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <div
    class="component-card divide-y border flex flex-col divide-blue-400 bg-white border-blue-500 shadow-xl text-left min-w-55 w-full shadow-blue-400 shadow-opacity-30 relative rounded-lg"
    un-dark="bg-gray-900 divide-blue-700 border-blue-600 shadow-opacity-30 shadow-blue-800"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow bg-blue-700 text-lg leading-snug text-blue-100 gap-1 justify-between items-center font-bold last-rounded-b-lg first-rounded-t-lg"
      un-dark="border-blue-500 bg-blue-900 text-blue-100"
    >
      <slot name="header" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-blue-300 last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-300 bg-gray-800"
    >
      <slot name="panel" />
    </div>
    <div
      v-if="slots.default"
      class="flex flex-col text-sm text-gray-700 items-stretch break-normal last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-200"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="flex-grow bg-gray-50 flex flex-row w-full text-sm text-gray-500 gap-1 last-rounded-b-lg first-rounded-t-lg"
      un-dark="text-gray-300 bg-gray-800 bg-opacity-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
