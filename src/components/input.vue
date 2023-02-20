<script setup lang="ts">
import type { PropType } from 'vue'

import type {
  UIColorVariants,
  UIRoundedVariants,
  UISizeVariants,
} from '@/types/ui'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  color: {
    type: String as PropType<UIColorVariants>,
    default: 'default',
  },
  size: {
    type: String as PropType<UISizeVariants>,
    default: 'md',
  },
  rounded: {
    type: String as PropType<UIRoundedVariants>,
    default: 'md',
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', val: string): void
}>()
const attrs = useAttrs()
const rootRef = ref<HTMLInputElement | null>(null)

defineExpose({
  rootRef,
})

function handleInput(evt: Event) {
  const t = evt.target as HTMLInputElement
  emit('update:modelValue', t.value)
}
</script>

<template>
  <input
    v-bind="attrs"
    ref="rootRef"
    class="c-input flex flex-row items-center justify-center border transition-200 outline-none"
    :class="[
      props.color &&
        `box-color__${props.color}--3 focus:box-color__${props.color}--4`,
      props.size && `box-size__${props.size}`,
      props.rounded && `box-rounded__${props.rounded}`,
    ]"
    :value="modelValue"
    @input="handleInput"
  />
</template>
