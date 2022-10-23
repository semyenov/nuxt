<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  UnoColorVariants,
  UnoRoundedVariants,
  UnoSizeVariants,
} from '@/uno'

const props = defineProps({
  color: {
    type: String as PropType<UnoColorVariants>,
    default: 'gray',
  },
  size: {
    type: String as PropType<UnoSizeVariants>,
    default: 'md',
  },
  rounded: {
    type: String as PropType<UnoRoundedVariants>,
    default: 'md',
  },
})

const attrs = useAttrs()
</script>

<template>
  <input
    v-bind="attrs"
    class="input"
    :class="`input-color__${props.color} input-size__${props.size} input-rounded__${props.rounded}`"
  />
</template>
