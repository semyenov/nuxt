<script setup lang="ts">
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
    default: false,
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
const slots = useSlots()

const rootRef = ref<HTMLElement | null>(null)

const horizontal = toRef(props, 'horizontal')
const shapeKey = computed((): 'width' | 'height' =>
  horizontal.value ? 'width' : 'height'
)

const resizeObserver = useResizeObserver(rootRef, (entries) => {
  dispatchSizeChange(entries[0].contentRect[shapeKey.value], true)
})

onUnmounted(() => {
  resizeObserver.stop()
})

onDeactivated(() => {
  resizeObserver.stop()
})

function dispatchSizeChange(size: number, hasInit: boolean) {
  emit('resize', props.dataId, size, hasInit)
}
</script>

<template>
  <Component :is="slots.default" v-if="slots.default" :ref="rootRef" />
</template>
