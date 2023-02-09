<script setup lang="ts">
import type { PropType } from 'vue'
import type { UIColorVariants } from '~~/uno'

const props = defineProps({
  color: {
    type: String as PropType<UIColorVariants>,
    default: 'red',
  },
})
const slots = useSlots()
</script>

<template>
  <div
    class="component-card w-full divide-y border flex flex-col bg-white shadow-xl text-left w-full shadow-opacity-30 relative rounded-lg dark:bg-gray-900 dark:shadow-opacity-30"
    :class="[props.color && `list-color__${props.color}`]"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center font-bold last-rounded-b-lg first-rounded-t-lg"
      :class="[props.color && `box-color__${props.color}--6`]"
    >
      <slot name="header" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-blue-300 last-rounded-b-lg first-rounded-t-lg dark:text-gray-300 dark:bg-gray-800"
    >
      <slot name="panel" />
    </div>
    <div
      v-if="slots.default"
      class="flex flex-col text-sm text-gray-700 items-stretch break-normal last-rounded-b-lg first-rounded-t-lg dark:text-gray-200 overflow-auto"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="flex-grow flex flex-row w-full text-sm gap-1 last-rounded-b-lg first-rounded-t-lg"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
