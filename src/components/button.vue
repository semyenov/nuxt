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
    default: 'xs',
  },
})

const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    class="btn"
    :class="`btn-${props.color} btn-${props.size}`"
  >
    <slot />
  </button>
</template>
