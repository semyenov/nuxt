<script setup lang="ts">
import { clamp, objectPick } from '@antfu/utils'

import type { PropType } from 'vue'
import type {
  UIColorVariants,
  UIRoundedVariants,
  UISizeVariants,
} from '@/types/ui'

import { Input, VirtualList } from '#components'

const props = defineProps({
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
  border: {
    type: Boolean,
    default: true,
  },

  searchFields: {
    type: Array,
    default: () => [],
  },

  options: {
    type: Array as PropType<Array<Record<string, any> & { _id: string }>>,
    required: true,
  },

  dataComponent: {
    type: [Object, Function],
    required: false,
  },
  dataKey: {
    type: String,
    default: '',
  },
})

const [isFocused, toggleFocused] = useToggle(false)

const inputRef = ref<InstanceType<typeof Input> | null>(null)
const listRef = ref<InstanceType<typeof VirtualList> | null>(null)

const input = ref<string>('аге')
const current = ref(-1)

const options = toRef(props, 'options')
const dataIds = computed(() =>
  options.value
    .filter((item) => findByOptionsFields(item, ['info', 'name'], input.value))
    .map((item) => item._id)
)
const dataGetter = async (id: string) =>
  computed(() => options.value.find((item) => item._id === id))

const showList = computed(() => isFocused.value && dataIds.value.length > 0)

function findByOptionsFields(item: any, path: string[], str: string) {
  let val = item
  for (const p of path) {
    if (!Object.hasOwn(val, p)) {
      return false
    }

    val = val[p]
  }

  if (typeof val === 'string') {
    return val.toLowerCase().includes(str.toLowerCase())
  }

  return false
}

onKeyStroke('ArrowUp', (event) => {
  event.preventDefault()

  if (isFocused) {
    current.value = clamp(current.value - 1, 0, dataIds.value.length)
    if (listRef.value) {
      listRef.value.scrollToIndex(current.value)
    }
  }
})

onKeyStroke('ArrowDown', (event) => {
  event.preventDefault()

  if (isFocused) {
    current.value = clamp(current.value + 1, 0, dataIds.value.length)
    if (listRef.value) {
      listRef.value.scrollToIndex(current.value)
    }
  }
})

onMounted(() => {
  if (!inputRef.value || !inputRef.value.rootRef) {
    return
  }

  inputRef.value.rootRef.blur()
  inputRef.value.rootRef.addEventListener('focus', toggleShowHandler)
  inputRef.value.rootRef.addEventListener('focusout', toggleShowHandler)
})

onUnmounted(() => {
  if (!inputRef.value || !inputRef.value.rootRef) {
    return
  }

  inputRef.value.rootRef.blur()
  inputRef.value.rootRef.removeEventListener('focus', toggleShowHandler)
  inputRef.value.rootRef.removeEventListener('focusout', toggleShowHandler)
})

function itemClassAdd(i: number) {
  if (i === current.value) {
    return props.color && `box-color__${props.color}--3`
  }

  return `box-color__${props.color}--2`
}

function toggleShowHandler() {
  toggleFocused()
}
</script>

<template>
  <div class="c-combobox relative">
    <Input
      ref="inputRef"
      v-model="input"
      :color="props.color"
      :border="props.border"
      :size="props.size"
      :rounded="props.rounded"
      :class="[showList && 'rounded-b-none']"
    />
    <VirtualList
      v-if="showList"
      ref="listRef"
      key="data-virtuallist"
      v-bind="objectPick(props, ['dataComponent', 'dataKey'])"
      :data-component="props.dataComponent"
      :data-key="props.dataKey"
      :data-ids="dataIds"
      :data-getter="dataGetter"
      :keeps="20"
      :page-mode="false"
      :wrap-class="[
        'flex flex-col w-full',
        props.color && `list-color__${props.color}`,
      ]"
      class="flex flex-col items-center absolute top-full left-0 right-0 max-h-100 overflow-auto rounded-t-none border border-t-none"
      :class="[
        props.rounded && `box-rounded__${props.rounded}`,
        props.color && `box-color__${props.color}--3`,
      ]"
      :estimate-size="40"
      :item-class-add="itemClassAdd"
    />
  </div>
</template>
