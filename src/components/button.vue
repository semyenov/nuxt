<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  UnoColorVariants,
  UnoRoundedVariants,
  UnoSizeVariants,
} from '~~/uno'

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
  <button
    v-bind="attrs"
    class="btn"
    :class="[
      `btn-color__${props.color}`,
      `btn-size__${props.size}`,
      `btn-rounded__${props.rounded}`,
    ]"
  >
    <slot />
  </button>
</template>
