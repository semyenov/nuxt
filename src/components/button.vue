<script setup lang="ts">
import type { PropType } from 'vue'
import type { UnoColor, UnoSize } from '@/uno'

const props = defineProps({
  color: {
    type: String as PropType<UnoColor>,
    default: 'gray',
  },
  size: {
    type: String as PropType<UnoSize>,
    default: 'md',
  },
  rounded: {
    type: String as PropType<UnoSize>,
    default: 'md',
  },
})

const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    class="btn"
    :class="`btn-color__${props.color} btn-size__${props.size} btn-rounded__${props.rounded}`"
  >
    <slot />
  </button>
</template>
