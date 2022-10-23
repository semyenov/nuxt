<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType<
      | 'rose'
      | 'pink'
      | 'fuchsia'
      | 'purple'
      | 'violet'
      | 'indigo'
      | 'blue'
      | 'sky'
      | 'cyan'
      | 'teal'
      | 'emerald'
      | 'green'
      | 'lime'
      | 'yellow'
      | 'amber'
      | 'orange'
      | 'red'
      | 'gray'
      | 'slate'
      | 'zinc'
      | 'neutral'
      | 'stone'
    >,
    default: 'gray',
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'base' | 'lg' | 'xl'>,
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
