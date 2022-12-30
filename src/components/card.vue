<script setup lang="ts">
import type { PropType } from 'vue'
import type { UnoColorVariants } from '~~/uno'

const props = defineProps({
  color: {
    type: String as PropType<UnoColorVariants>,
    default: 'gray',
  },
})
const slots = useSlots()
</script>

<template>
  <div
    :class="
      props.color &&
      `divide-${props.color}-400 border-${props.color}-500 shadow-${props.color}-400 dark:divide-${props.color}-700 dark:border-${props.color}-600 dark:shadow-${props.color}-800`
    "
    class="component-card divide-y border flex flex-col bg-white shadow-xl text-left min-w-55 w-full shadow-opacity-30 relative rounded-lg dark:bg-gray-900 dark:shadow-opacity-30"
  >
    <div
      v-if="slots.header"
      :class="
        props.color &&
        `bg-${props.color}-700 text-${props.color}-100 dark:border-${props.color}-500 dark:bg-${props.color}-900 dark:text-${props.color}-100`
      "
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center font-bold last-rounded-b-lg first-rounded-t-lg"
    >
      <slot name="header" />
    </div>
    <div
      v-if="slots.panel"
      :class="props.color && `border-${props.color}-300`"
      class="border-b flex flex-row bg-light-400 last-rounded-b-lg first-rounded-t-lg dark:text-gray-300 dark:bg-gray-800"
    >
      <slot name="panel" />
    </div>
    <div
      v-if="slots.default"
      class="flex flex-col text-sm text-gray-700 items-stretch break-normal last-rounded-b-lg first-rounded-t-lg dark:text-gray-200"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="flex-grow bg-gray-50 flex flex-row w-full text-sm text-gray-500 gap-1 last-rounded-b-lg first-rounded-t-lg dark:text-gray-300 dark:bg-gray-800 dark:bg-opacity-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
