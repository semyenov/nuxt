<script setup lang="ts">
import type { UIColorVariants } from '@/types/ui'

const props = defineProps({
  color: {
    type: String as PropType<UIColorVariants>,
    default: 'primary',
  },
})
// const slots = useSlots()
</script>

<template>
  <div
    class="component-card w-full divide-y border flex flex-col bg-white text-left w-full relative rounded-lg dark:bg-gray-900"
    :class="[props.color && `list-color__${props.color}`]"
  >
    <div
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center last-rounded-b-lg first-rounded-t-lg px-4 py-2"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center last-rounded-b-lg first-rounded-t-lg px-4 py-2"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center last-rounded-b-lg first-rounded-t-lg px-4 py-2"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-row flex-grow text-lg leading-snug gap-1 justify-between items-center last-rounded-b-lg first-rounded-t-lg px-4 py-2"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
  </div>
</template>
