<script setup lang="ts">
import type { ComputedRef, DefineComponent, PropType } from 'vue'

const props = defineProps({
  index: {
    type: Number,
  },
  tag: {
    type: String,
    default: 'div',
  },
  horizontal: {
    type: Boolean,
  },
  getter: {
    type: Function as PropType<
      (id: string) => ComputedRef<Record<string, any> & { _id: string }>
    >,
    required: true,
  },
  component: {
    type: [Object, Function] as PropType<DefineComponent<any, any, any>>,
    required: true,
  },
  slotComponent: {
    type: Function,
  },
  estimateSize: {
    type: Number,
    default: 100,
  },
  dataId: {
    type: String,
    required: true,
  },
  dataKey: {
    type: String,
    default: '',
  },
  extraProps: {
    type: Object,
  },
  scopedSlots: {
    type: Object,
  },
  itemClass: {
    type: String,
  },
})

const emit = defineEmits(['resize'])

const index = toRef(props, 'index')
const dataId = toRef(props, 'dataId')

const item = props.getter(dataId.value)

const itemRef = ref<HTMLElement | null>(null)
const shapeKey = ref<'width' | 'height'>(props.horizontal ? 'width' : 'height')

const resizeObserver = useResizeObserver(itemRef, (entries) => {
  dispatchSizeChange(entries[0].contentRect[shapeKey.value])
})

onDeactivated(() => {
  resizeObserver.stop()
})

onUnmounted(() => {
  resizeObserver.stop()
})

// tell parent current size identify by unqiue key
function dispatchSizeChange(size: number) {
  emit('resize', dataId, size, false)
}
</script>

<template>
  <KeepAlive :key="`${props.dataKey}-listitem_keepapive-${dataId}-${index}`">
    <Component
      :is="props.tag"
      v-if="item"
      ref="itemRef"
      :key="`${props.dataKey}-listitem_tag-${dataId}-${index}`"
      :class="props.itemClass"
      role="listitem"
    >
      <Component
        v-bind="{
          scopedSlots: props.scopedSlots,
          extraProps: props.extraProps,
          index,
          item,
        }"
        :is="props.component"
        v-if="props.component"
        :key="`${props.dataKey}-listitem_component-${dataId}-${index}`"
      />
      <Component
        :is="props.slotComponent"
        v-else-if="props.slotComponent"
        :key="`${props.dataKey}-listitem_slotcomponent-${dataId}-${index}`"
      />
    </Component>
    <Component
      :is="props.tag"
      v-else
      :key="`${props.dataKey}-listitem_placeholder-${dataId}-${index}`"
      :style="{
        display: 'block',
        height: `${props.estimateSize}px`,
      }"
    />
  </KeepAlive>
</template>
