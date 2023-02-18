<script setup lang="ts">
import type { PropType } from 'vue'
import type { UIColorVariants, UIRoundedVariants } from '@/types/ui'

const props = defineProps({
  color: {
    type: String as PropType<UIColorVariants>,
    default: 'primary',
  },
  rounded: {
    type: String as PropType<UIRoundedVariants>,
    default: 'md',
  },
})
const slots = useSlots()
</script>

<template>
  <div
    class="component-card w-full divide-y border flex flex-col bg-white shadow-xl text-left w-full shadow-opacity-30 relative dark:bg-gray-900 dark:shadow-opacity-30"
    :class="[
      props.color && `list-color__${props.color}`,
      props.rounded && `box-rounded__${props.rounded}`,
    ]"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center font-bold"
      :class="[
        props.color && `box-color__${props.color}--8`,
        props.rounded && `list-rounded__${props.rounded}`,
      ]"
    >
      <slot name="header" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-blue-300 dark:text-gray-300 dark:bg-gray-800"
    >
      <slot name="panel" />
    </div>
    <div
      v-if="slots.default"
      class="flex flex-col text-sm items-stretch break-normal overflow-auto"
      :class="[
        props.color && `box-color__${props.color}--1`,
        props.rounded && `list-rounded__${props.rounded}`,
      ]"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="flex-grow flex flex-row w-full text-sm gap-1"
      :class="[
        props.color && `box-color__${props.color}--2`,
        props.rounded && `list-rounded__${props.rounded}`,
      ]"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
