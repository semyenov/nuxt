<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'

const props = defineProps({
  dataId: {
    type: String,
    required: true,
    default: '',
  },
  tag: {
    type: String,
    default: 'div',
  },
  horizontal: {
    type: Boolean,
  },
  getter: {
    type: Function,
    default: () => {},
  },
  estimateSize: {
    type: Number,
    default: 100,
  },
  itemClass: {
    type: String,
  },
})

const emit = defineEmits(['resize'])

const el: MaybeElementRef = ref(null)
const slots = useSlots()
const shapeKey = ref<'width' | 'height'>(props.horizontal ? 'width' : 'height')
const resizeObserver = useResizeObserver(el, (entries) => {
  dispatchSizeChange(entries[0].contentRect[shapeKey.value], true)
})

onDeactivated(() => {
  resizeObserver.stop()
})
onUnmounted(() => {
  resizeObserver.stop()
})

function dispatchSizeChange(size: number, hasInit: boolean) {
  emit('resize', props.dataId, size, hasInit)
}
</script>

<template>
  <Component :is="slots.default" v-if="slots.default" :ref="el" />
</template>
