<script setup lang="ts">
import { range } from '@antfu/utils'

import type { ComputedRef, DefineComponent, PropType } from 'vue'

import type { VirtualRange } from '@/composables/virtual'
import Virtual from '@/composables/virtual'

const props = defineProps({
  dataIds: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
  dataGetter: {
    type: Function as PropType<
      <T = Record<string, any> & { _id: string }>(
        id: string
      ) => Promise<T | undefined> | T | undefined
    >,
    default: () => {},
  },
  dataComponent: {
    type: [Object, Function] as PropType<DefineComponent<any, any, any>>,
    required: false,
  },
  dataKey: {
    type: String,
    default: '',
  },
  dataCursor: {
    type: Number,
    default: () => 0,
  },

  keeps: {
    type: Number,
    default: 30,
  },
  extraProps: {
    type: Object,
  },
  estimateSize: {
    type: Number,
    default: 100,
  },

  direction: {
    type: String,
    default: 'vertical', // the other value is horizontal
  },
  start: {
    type: Number,
    default: 0,
  },
  offset: {
    type: Number,
    default: 0,
  },
  topThreshold: {
    type: Number,
    default: 0,
  },
  bottomThreshold: {
    type: Number,
    default: 0,
  },
  pageMode: {
    type: Boolean,
    default: false,
  },
  rootTag: {
    type: String,
    default: 'div',
  },
  wrapTag: {
    type: String,
    default: 'div',
  },
  wrapClass: {
    type: String,
    default: '',
  },
  wrapStyle: {
    type: Object,
    default: () => ({}),
  },
  itemTag: {
    type: String,
    default: 'div',
  },
  itemClass: {
    type: String,
    default: '',
  },
  itemClassAdd: {
    type: Function,
  },
  itemStyle: {
    type: Object,
  },
  headerTag: {
    type: String,
    default: 'div',
  },
  headerClass: {
    type: String,
    default: '',
  },
  headerStyle: {
    type: Object,
  },
  footerTag: {
    type: String,
    default: 'div',
  },
  footerClass: {
    type: String,
    default: '',
  },
  footerStyle: {
    type: Object,
  },
  itemScopedSlots: {
    type: Object,
  },
})

const emit = defineEmits<{
  (event: 'scroll', evt: UIEvent, r: VirtualRange): void
  (event: 'resized', id: string, size: number): void
  (event: 'totop'): void
  (event: 'tobottom'): void
}>()

const slots = useSlots()

const rootRef = ref<HTMLElement | null>(null)
const shepherdRef = ref<HTMLElement | null>(null)

const direction = toRef(props, 'direction')
const isHorizontal = computed(() => direction.value === 'horizontal')

const dataIds = toRef(props, 'dataIds')

const wrapperStyle = ref<Record<string, any>>({})
const vr = ref<[number, number]>([
  Math.max(props.start, 0),
  Math.min(props.start + props.keeps, dataIds.value.length),
])

const v = new Virtual(
  {
    slotHeaderSize: 0,
    slotFooterSize: 0,
    keeps: props.keeps,
    estimateSize: props.estimateSize,
    buffer: Math.round(props.keeps / 2),
    uniqueIds: dataIds.value.slice(),
  },
  onRangeChanged
)

const directionKey = computed<'scrollLeft' | 'scrollTop'>(() => {
  return isHorizontal.value ? 'scrollLeft' : 'scrollTop'
})

onMounted(() => {
  // in page mode we bind scroll event to document
  if (props.pageMode) {
    updatePageModeFront()

    document.addEventListener('scroll', onScroll, {
      passive: false,
    })
  }

  // set position
  onScroll(new Event('scroll'))
})

// set back offset when awake from keep-alive
onActivated(() => {
  if (props.pageMode) {
    updatePageModeFront()

    document.addEventListener('scroll', onScroll, {
      passive: false,
    })
  }

  onScroll()
})

onDeactivated(() => {
  if (props.pageMode) {
    document.removeEventListener('scroll', onScroll)
  }
})

onUnmounted(() => {
  if (props.pageMode) {
    document.removeEventListener('scroll', onScroll)
  }
})

watch(
  () => dataIds.value,
  (dataIds) => {
    v.updateParam('uniqueIds', dataIds.slice())
    v.handleDataSourcesChange()
  }
)
watch(
  () => props.keeps,
  (keeps) => {
    v.updateParam('keeps', keeps)
    v.handleSlotSizeChange()
  }
)
watch(
  () => props.start,
  (start) => {
    scrollToIndex(start)
  }
)
watch(
  () => props.offset,
  (offset) => {
    scrollToOffset(offset)
  }
)

// return current scroll offset
function getOffset() {
  if (props.pageMode) {
    return (
      document.documentElement[directionKey.value] ||
      document.body[directionKey.value]
    )
  }

  if (rootRef.value) {
    return rootRef.value ? Math.ceil(rootRef.value[directionKey.value]) : 0
  }

  return 0
}

// return client viewport size
function getClientSize() {
  const key = isHorizontal.value ? 'clientWidth' : 'clientHeight'
  if (props.pageMode) {
    return document.documentElement[key] || document.body[key]
  }

  return rootRef.value ? Math.ceil(rootRef.value[key]) : 0
}

// return all scroll size
function getScrollSize() {
  const key = isHorizontal.value ? 'scrollWidth' : 'scrollHeight'
  if (props.pageMode) {
    return document.documentElement[key] || document.body[key]
  }

  return rootRef.value ? Math.ceil(rootRef.value[key]) : 0
}

// set current scroll position to a expectant offset
function scrollToOffset(offset: number) {
  if (props.pageMode) {
    document.body[directionKey.value] = offset
    document.documentElement[directionKey.value] = offset

    return
  }

  if (rootRef.value) {
    rootRef.value[directionKey.value] = offset
  }
}

// set current scroll position to a expectant index
function scrollToIndex(index: number) {
  if (index < dataIds.value.length) {
    scrollToOffset(v.getOffset(index))

    return
  }

  scrollToBottom()
}

// set current scroll position to bottom
function scrollToBottom() {
  if (shepherdRef.value) {
    scrollToOffset(
      shepherdRef.value[isHorizontal.value ? 'offsetLeft' : 'offsetTop']
    )

    // check if it's really scrolled to the bottom
    // maybe list doesn't render and calculate to last range
    // so we need retry in next event loop until it really at bottom
    setTimeout(() => {
      if (getOffset() + getClientSize() < getScrollSize()) {
        scrollToBottom()
      }
    }, 3)
  }
}

// when using page mode we need update slot header size manually
// taking root offset relative to the browser as slot header size
function updatePageModeFront() {
  if (rootRef.value) {
    const rect = rootRef.value.getBoundingClientRect()
    const { defaultView } = rootRef.value.ownerDocument

    if (defaultView) {
      const offsetFront = isHorizontal.value
        ? rect.left + defaultView!.pageXOffset
        : rect.top + defaultView!.pageYOffset
      v.updateParam('slotHeaderSize', offsetFront)
    }
  }
}

// event called when each item mounted or size changed
function onItemResized(id: string, size: number) {
  v.saveSize(id, size)
  emit('resized', id, size)
}

// event called when slot mounted or size changed
function onSlotResized(type: string, size: any, init: boolean) {
  switch (type) {
    case 'thead':
      v.updateParam('slotHeaderSize', size)
      break

    case 'tfoot':
      v.updateParam('slotFooterSize', size)
      break
  }

  if (init) {
    v.handleSlotSizeChange()
  }
}

// here is the rerendering entry
function onRangeChanged(r: VirtualRange) {
  vr.value = [r.start, r.end + 1]
  wrapperStyle.value = getWrapperStyle(r.padBehind, r.padFront)
}

function onScroll(evt?: any) {
  const offset = getOffset()
  const clientSize = getClientSize()
  const scrollSize = getScrollSize()

  // iOS scroll-spring-back behavior will make direction mistake
  if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
    return
  }

  emitScrollEvent(offset, clientSize, scrollSize, evt)
  v.handleScroll(offset)
}

// emit event in special position
function emitScrollEvent(
  offset: number,
  clientSize: number,
  scrollSize: number,
  evt: any
) {
  emit('scroll', evt, v.getRange())

  if (
    v.isFront() &&
    dataIds.value.length > 0 &&
    offset - props.topThreshold <= 0
  ) {
    emit('totop')

    return
  }

  if (
    v.isBehind() &&
    offset + clientSize + props.bottomThreshold >= scrollSize
  ) {
    emit('tobottom')
  }
}

function getWrapperStyle(
  padBehind: number,
  padFront: number
): Record<string, any> {
  return {
    ...props.wrapStyle,
    padding: isHorizontal.value
      ? `0px ${padBehind}px 0px ${padFront}px`
      : `${padFront}px 0px ${padBehind}px`,
  }
}
</script>

<template>
  <Component
    :is="props.rootTag"
    :key="`${props.dataKey}-list_root`"
    ref="rootRef"
    @scroll="(evt: UIEvent) => !props.pageMode && onScroll(evt)"
  >
    <VirtualListSlot
      :key="`${props.dataKey}-list_header`"
      :tag="props.headerTag"
      :class="props.headerClass"
      :style="props.headerStyle"
      data-id="thead"
      @resize="onSlotResized"
    >
      <slot name="header" />
    </VirtualListSlot>

    <Component
      :is="props.wrapTag"
      :key="`${props.dataKey}_list_wrap`"
      :class="props.wrapClass"
      :style="wrapperStyle"
      role="group"
    >
      <VirtualListItem
        v-for="i in range(...vr).slice()"
        :key="`${props.dataKey}-list_component-${dataIds.at(i)}-${i}`"
        :index="i"
        :tag="props.itemTag"
        :style="props.itemStyle"
        :horizontal="isHorizontal"
        :data-id="dataIds.at(i)"
        :estimate-size="v.getEstimateSize()"
        :data-key="props.dataKey"
        :data-getter="props.dataGetter"
        :extra-props="props.extraProps"
        :data-component="props.dataComponent"
        :slot-component="slots && slots.item"
        :scoped-slots="props.itemScopedSlots"
        :item-class="
          props.itemClass +
          (props.itemClassAdd ? ` ${props.itemClassAdd(i)}` : '')
        "
        @resize="onItemResized"
      />
    </Component>

    <VirtualListSlot
      :key="`${props.dataKey}-list_footer`"
      :class="props.footerClass"
      :style="props.footerStyle"
      :tag="props.footerTag"
      data-id="tfoot"
      @resize="onSlotResized"
    >
      <slot name="footer" />
    </VirtualListSlot>
  </Component>
</template>
