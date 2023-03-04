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
    class="component-card relative w-full w-full flex flex-col border rounded-lg bg-white text-left divide-y dark:bg-gray-900"
    :class="[props.color && `list-color__${props.color}`]"
  >
    <div
      class="flex flex-grow flex-row items-center justify-between gap-1 px-4 py-2 text-lg leading-snug first-rounded-t-lg last-rounded-b-lg"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-grow flex-row items-center justify-between gap-1 px-4 py-2 text-lg leading-snug first-rounded-t-lg last-rounded-b-lg"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-grow flex-row items-center justify-between gap-1 px-4 py-2 text-lg leading-snug first-rounded-t-lg last-rounded-b-lg"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
    <div
      class="flex flex-grow flex-row items-center justify-between gap-1 px-4 py-2 text-lg leading-snug first-rounded-t-lg last-rounded-b-lg"
      :class="[props.color && `box-color__${props.color}--2`]"
    >
      Test
    </div>
  </div>
</template>
