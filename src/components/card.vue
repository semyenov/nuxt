<script setup lang="ts">
const props = defineProps({
  odd: {
    type: Boolean,
    default: false,
  },
})
const slots = useSlots()
</script>

<template>
  <div
    class="divide-y border flex flex-col divide-gray-200 bg-opacity-80 border-gray-300 shadow-lg text-left min-w-75 transition-shadow shadow-gray-200 relative dark:divide-gray-700 dark:border-gray-800 dark:shadow-gray-900"
    :class="props.odd ? 'odd' : 'even'"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow bg-green-600 text-base leading-snug py-2 px-4 text-gray-50 gap-4 justify-between items-center dark:border-gray-700 dark:bg-green-600 dark:text-gray-300 font-bold"
    >
      <slot name="header" />
      <slot name="menu" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-gray-300 dark:bg-dark-800 py-2 px-4"
    >
      <slot name="panel" />
    </div>
    <div
      class="flex flex-col bg-gray-50 text-sm text-gray-800 dark:text-gray-300 dark:bg-gray-800 -800 items-stretch break-normal py-2 px-4 dark:text-gray-300"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="rounded-b-md flex-grow flex flex-row w-full p-4 text-gray-500 gap-4 dark:text-gray-400"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
