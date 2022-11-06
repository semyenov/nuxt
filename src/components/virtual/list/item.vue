<script setup lang="ts">
import type { DefineComponent, PropType, Ref } from 'vue'
import type { IWithIdentificator } from '@/store/backend'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    default: 'div',
  },
  horizontal: {
    type: Boolean,
    default: false,
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
  dataGetter: {
    type: Function as PropType<
      <T extends IWithIdentificator>(id: string) => Ref<T | undefined>
    >,
    required: true,
  },
  dataComponent: {
    type: [Object, Function] as PropType<DefineComponent<any, any, any>>,
    required: false,
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

const emit = defineEmits<{
  (event: 'resize', id: string, size: number, init: boolean): void
}>()

const index = toRef(props, 'index')
const dataId = toRef(props, 'dataId')

const item = props.dataGetter(dataId.value)

const rootRef = ref<HTMLElement | null>(null)
const horizontal = toRef(props, 'horizontal')
const shapeKey = computed<'width' | 'height'>(() =>
  horizontal.value ? 'width' : 'height'
)

const resizeObserver = useResizeObserver(rootRef, (entries) => {
  if (entries.length > 0) {
    emit('resize', dataId.value, entries[0].contentRect[shapeKey.value], false)
  }
})

onMounted(dispatchSizeChange)
onActivated(dispatchSizeChange)

onDeactivated(resizeObserver.stop)
onUnmounted(resizeObserver.stop)

function dispatchSizeChange() {
  if (rootRef.value) {
    const entries = rootRef.value.getClientRects()
    if (entries.length > 0) {
      emit('resize', dataId.value, entries[0][shapeKey.value], true)
    }
  }
}
</script>

<template>
  <KeepAlive :key="`${props.dataKey}-listitem_keepapive-${dataId}-${index}`">
    <Component
      :is="props.tag"
      v-if="item"
      ref="rootRef"
      :key="`${props.dataKey}-listitem_tag-${dataId}-${index}`"
      role="listitem"
    >
      <Component
        v-bind="{
          scopedSlots: props.scopedSlots,
          extraProps: props.extraProps,
          index,
          item,
        }"
        :is="props.dataComponent"
        v-if="props.dataComponent"
        :key="`${props.dataKey}-listitem_component-${dataId}-${index}`"
        :class="props.itemClass"
      />
      <Component
        :is="props.slotComponent"
        v-else-if="props.slotComponent"
        :key="`${props.dataKey}-listitem_slotcomponent-${dataId}-${index}`"
        :class="props.itemClass"
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
