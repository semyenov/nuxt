<script setup lang="ts">
import { range } from '@antfu/utils'

import type { DefineComponent, PropType } from 'vue'
import type { VirtualRange } from '@/composables/virtual'

import Virtual from '@/composables/virtual'

const props = defineProps({
  dataIds: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
  dataGetter: {
    type: Function,
    default: () => {},
  },
  dataComponent: {
    type: [Object, Function] as PropType<DefineComponent<any, any, any>>,
    required: true,
    default: () => {},
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

const emit = defineEmits([
  'resized',
  'scroll',
  'totop',
  'tobottom',
  'deactivated',
])
const slots = useSlots()

const vr = ref<VirtualRange>()
const v = new Virtual(
  {
    slotHeaderSize: 0,
    slotFooterSize: 0,
    keeps: props.keeps,
    estimateSize: props.estimateSize,
    buffer: Math.round(props.keeps / 2),
    uniqueIds: props.dataIds,
  },
  onRangeChanged
)

const root = ref<HTMLElement | null>(null)
const shepherd = ref<HTMLElement | null>(null)

watch(
  () => props.dataIds,
  (dataIds) => {
    v.updateParam('uniqueIds', dataIds)
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

const isHorizontal = ref(props.direction === 'horizontal')
const directionKey = ref<'scrollLeft' | 'scrollTop'>(
  isHorizontal.value ? 'scrollLeft' : 'scrollTop'
)

onMounted(() => {
  // in page mode we bind scroll event to document
  if (props.pageMode) {
    updatePageModeFront()

    document.addEventListener('scroll', onScroll, {
      passive: false,
    })
  }

  // set position
  const offset = getOffset()
  v.handleScroll(offset)
})

// set back offset when awake from keep-alive
onActivated(() => {
  if (props.pageMode) {
    updatePageModeFront()

    document.addEventListener('scroll', onScroll, {
      passive: false,
    })
  }

  const offset = getOffset()
  v.handleScroll(offset)
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

// return current scroll offset
function getOffset() {
  if (props.pageMode) {
    return (
      document.documentElement[directionKey.value] ||
      document.body[directionKey.value]
    )
  } else {
    return root.value ? Math.ceil(root.value[directionKey.value]) : 0
  }
}

// return client viewport size
function getClientSize() {
  const key = isHorizontal.value ? 'clientWidth' : 'clientHeight'
  if (props.pageMode) {
    return document.documentElement[key] || document.body[key]
  } else return root.value ? Math.ceil(root.value[key]) : 0
}

// return all scroll size
function getScrollSize() {
  const key = isHorizontal.value ? 'scrollWidth' : 'scrollHeight'
  if (props.pageMode) {
    return document.documentElement[key] || document.body[key]
  } else return root.value ? Math.ceil(root.value[key]) : 0
}

// set current scroll position to a expectant offset
function scrollToOffset(offset: number) {
  if (props.pageMode) {
    document.body[directionKey.value] = offset
    document.documentElement[directionKey.value] = offset
  } else if (root.value) {
    root.value[directionKey.value] = offset
  }
}

// set current scroll position to a expectant index
function scrollToIndex(index: number) {
  if (index < props.dataIds.length) {
    scrollToOffset(v.getOffset(index))
  } else scrollToBottom()
}

// set current scroll position to bottom
function scrollToBottom() {
  if (shepherd.value) {
    scrollToOffset(
      shepherd.value[isHorizontal.value ? 'offsetLeft' : 'offsetTop']
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
  if (root.value) {
    const rect = root.value.getBoundingClientRect()
    const { defaultView } = root.value.ownerDocument

    if (defaultView) {
      const offsetFront = isHorizontal.value
        ? rect.left + defaultView!.pageXOffset
        : rect.top + defaultView!.pageYOffset
      v.updateParam('slotHeaderSize', offsetFront)
    }
  }
}

// // reset all state back to initial
// function reset() {
//   virtual.updateParam('uniqueIds', props.dataIds)
//   virtual.updateParam('estimateSize', props.estimateSize)

//   // virtual = new Virtual(
//   //   {
//   //     slotHeaderSize: 0,
//   //     slotFooterSize: 0,
//   //     keeps: props.keeps,
//   //     estimateSize: props.estimateSize,
//   //     buffer: Math.round(props.keeps / 2),
//   //     uniqueIds: props.dataIds,
//   //   },
//   //   onRangeChanged,
//   // )
// }

// ----------- public method end -----------

// event called when each item mounted or size changed
function onItemResized(id: string, size: number) {
  v.saveSize(id, size)
  emit('resized', id, size)
}

// event called when slot mounted or size changed
function onSlotResized(type: string, size: any, hasInit: boolean) {
  if (type === 'thead') {
    v.updateParam('slotHeaderSize', size)
  } else if (type === 'tfoot') {
    v.updateParam('slotFooterSize', size)
  }

  if (hasInit) {
    v.handleSlotSizeChange()
  }
}

// here is the rerendering entry
function onRangeChanged(r: VirtualRange) {
  vr.value = r
}

function onScroll(evt: any) {
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
    props.dataIds.length > 0 &&
    offset - props.topThreshold <= 0
  )
    emit('totop')
  else if (
    v.isBehind() &&
    offset + clientSize + props.bottomThreshold >= scrollSize
  )
    emit('tobottom')
}

const wrapperStyle = computed(() => ({
  ...props.wrapStyle,
  padding: isHorizontal.value
    ? `0px ${vr.value?.padBehind}px 0px ${vr.value?.padFront}px`
    : `${vr.value?.padFront}px 0px ${vr.value?.padBehind}px`,
}))
</script>

<template>
  <Component
    :is="props.rootTag"
    :key="`${props.dataKey}_listitem_root}`"
    ref="root"
    @scroll="!pageMode && onScroll()"
  >
    <VirtualListSlot
      :key="`${props.dataKey}_header`"
      data-id="thead"
      :tag="props.headerTag"
      :class="props.headerClass"
      :style="props.headerStyle"
      @resize="onSlotResized"
    >
      <slot name="header" />
    </VirtualListSlot>

    <Component
      :is="props.wrapTag"
      v-if="vr"
      :key="`${props.dataKey}_listitem_wrap}`"
      role="group"
      :class="props.wrapClass"
      :style="wrapperStyle"
    >
      <VirtualListItem
        v-for="index in range(vr.start, vr.end + 1, 1)"
        :key="`${props.dataKey}_listitem_${index}`"
        role="listitem"
        :index="index"
        :tag="props.itemTag"
        :horizontal="isHorizontal"
        :data-id="props.dataIds[index]"
        :estimate-size="v.getEstimateSize()"
        :getter="props.dataGetter"
        :extra-props="props.extraProps"
        :component="props.dataComponent"
        :slot-component="slots && slots.item"
        :scoped-slots="props.itemScopedSlots"
        :style="props.itemStyle"
        :item-class="
          props.itemClass +
          (props.itemClassAdd ? ` ${props.itemClassAdd(index)}` : '')
        "
        @resize="onItemResized"
      />
    </Component>

    <VirtualListSlot
      :key="`${props.dataKey}_footer`"
      data-id="tfoot"
      :class="props.footerClass"
      :style="props.footerStyle"
      :tag="props.footerTag"
      @resize="onSlotResized"
    >
      <slot name="footer" />
    </VirtualListSlot>
  </Component>
</template>

<style lang="postcss">
.virtual-list--cards {
  @apply flex flex-col h-full p-4 overflow-auto;
}
</style>
