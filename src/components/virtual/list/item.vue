<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'
import type { DefineComponent, PropType } from 'vue'

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
    type: Function,
    default: () => {},
  },
  component: {
    type: [Object, Function] as PropType<DefineComponent<any, any, any>>,
    required: true,
    default: () => {},
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

const item = await props.getter(props.dataId)

const el: MaybeElementRef = ref(null)
const shapeKey = ref<'width' | 'height'>(props.horizontal ? 'width' : 'height')
const resizeObserver = useResizeObserver(el, (entries) => {
  dispatchSizeChange(entries[0].contentRect[shapeKey.value])
})

onDeactivated(() => {
  resizeObserver.stop()
})

onBeforeUnmount(() => {
  resizeObserver.stop()
})

// tell parent current size identify by unqiue key
function dispatchSizeChange(size: number) {
  emit('resize', props.dataId, size, false)
}
</script>

<template>
  <KeepAlive>
    <Component
      :is="props.tag"
      v-if="item"
      ref="el"
      :key="`listitem_tag_${props.dataId}`"
      role="listitem"
      :class="props.itemClass"
    >
      <Component
        v-bind="{
          scopedSlots: props.scopedSlots,
          item,
          index: props.index,
          extraProps: props.extraProps,
        }"
        :is="props.component"
        v-if="props.component"
        :key="`listitem_component_${props.dataId}`"
      />
      <Component
        :is="props.slotComponent"
        v-else-if="props.slotComponent"
        :key="`listitem_slotcomponent_${props.dataId}`"
      />
    </Component>
    <Component
      :is="props.tag"
      v-else
      :key="`listitem_placeholder_${props.dataId}`"
      :style="{
        display: 'block',
        height: `${props.estimateSize}px`,
      }"
    />
  </KeepAlive>
</template>
