<script setup lang="ts">
import type { PropType } from 'vue'

import type {
  UnoColorVariants,
  UnoRoundedVariants,
  UnoSizeVariants,
} from '~~/uno'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
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

const emit = defineEmits<{
  (event: 'update:modelValue', val: string): void
}>()
const attrs = useAttrs()

function handleInput(evt: Event) {
  const t = evt.target as HTMLInputElement
  emit('update:modelValue', t.value)
}
</script>

<template>
  <input
    v-bind="attrs"
    class="input"
    :class="[
      `input-color__${props.color}`,
      `input-size__${props.size}`,
      `input-rounded__${props.rounded}`,
    ]"
    :value="modelValue"
    @input="handleInput"
  />
</template>
