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
  modelValue: {
    type: String as PropType<string>,
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
  border: {
    type: Boolean,
    default: true,
  },

  searchFields: {
    type: Array as PropType<string[]>,
    default: () => ['info', 'name'],
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

const emit = defineEmits<{
  (event: 'update:modelValue', val?: string): void
}>()

const dirty = ref(false)
const [isFocused, toggleFocused] = useToggle(false)

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<InstanceType<typeof Input> | null>(null)
const listComponent = ref<InstanceType<typeof VirtualList> | null>(null)

const input = ref<string>('')

const options = toRef(props, 'options')
const dataIds = computed(() =>
  dirty.value
    ? options.value
        .filter((item) => filterByField(item, props.searchFields, input.value))
        .map((item) => item._id)
    : []
)
const dataGetter = async (id: string) =>
  computed(() => options.value.find((item) => item._id === id))

const show = computed(() => isFocused.value && dataIds.value.length > 0)
const cursor = ref(dataIds.value.findIndex((id) => id === props.modelValue))

watch(isFocused, () => (dirty.value = true))

watch(dataIds, () => {
  if (!listComponent.value) {
    return
  }

  listComponent.value.scrollToIndex(0)
})

watch(input, (i) => {
  if (!listComponent.value) {
    return
  }

  listComponent.value.scrollToIndex(0)
  cursor.value = -1

  if (i !== '') {
    return
  }

  emit('update:modelValue', undefined)
})

onClickOutside(rootRef, () => {
  toggleFocused(false)
})

onKeyStroke('Backspace', async () => {
  if (!isFocused.value || !props.modelValue) {
    return
  }

  const item = await dataGetter(props.modelValue)
  if (!item) {
    return
  }

  const field = getField(item, props.searchFields)
  const str = field ? field.toString() : ''
  if (input.value === str) {
    input.value = ''
  }
})

onKeyStroke('ArrowUp', (event) => {
  if (!isFocused.value) {
    return
  }

  event.preventDefault()

  cursor.value = clamp(cursor.value - 1, 0, dataIds.value.length - 1)
  if (listComponent.value) {
    listComponent.value.scrollToIndex(cursor.value)
  }
})

onKeyStroke('ArrowDown', (event) => {
  if (!isFocused.value) {
    return
  }

  event.preventDefault()

  cursor.value = clamp(cursor.value + 1, 0, dataIds.value.length - 1)
  if (listComponent.value) {
    listComponent.value.scrollToIndex(cursor.value)
  }
})

onKeyStroke('Enter', async (event) => {
  if (!isFocused.value || cursor.value < 0) {
    return
  }

  event.preventDefault()

  itemClickHandler(cursor.value)
})

onMounted(() => {
  if (!inputRef.value?.rootRef) {
    return
  }
  // inputRef.value.rootRef.addEventListener('focus', focusEventListener)
  document.addEventListener('focusin', documentFocusinEventListener)
  documentFocusinEventListener()

  if (cursor.value < 0) {
    return
  }

  itemClickHandler(cursor.value)
})

onUnmounted(() => {
  if (!inputRef.value?.rootRef) {
    return
  }

  // inputRef.value.rootRef.removeEventListener('focus', focusEventListener)
  document.removeEventListener('focusin', documentFocusinEventListener)
})

function filterByField(item: any, path: string[], str: string) {
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

function getField<T extends object>(
  obj: T,
  path: string[],
  defaultValue?: string
): string | object | undefined {
  const travel = () => {
    let val: object = obj

    for (const i in path) {
      const p = path[i] as keyof typeof val
      if (!Object.hasOwn(val, p)) {
        return
      }

      val = val[p] as T[typeof p]
    }

    return val
  }

  const result = travel()
  return result === undefined || result === obj ? defaultValue : result
}

function itemClassAdd(n: number) {
  if (n === cursor.value) {
    return props.color && `box-color__${props.color}--4`
  }

  return `box-color__${props.color}--3`
}

async function itemClickHandler(n: number) {
  cursor.value = n
  const itemId = dataIds.value[cursor.value]
  const item = await dataGetter(itemId)
  if (!item.value) {
    return
  }

  emit('update:modelValue', itemId)

  if (!inputRef.value?.rootRef) {
    return
  }

  toggleFocused(false)
  inputRef.value.rootRef.blur()

  const field = getField(item.value, props.searchFields)
  const str = field ? field.toString() : ''

  input.value = str
}

async function itemHoverHandler(n: number) {
  cursor.value = n
}

function inputCleanHandler() {
  if (!inputRef.value?.rootRef) {
    return
  }

  emit('update:modelValue', '')

  toggleFocused(true)
  input.value = ''
  cursor.value = -1
  inputRef.value.rootRef.focus()
}

function inputFocusHandler() {
  if (!inputRef.value?.rootRef) {
    return
  }

  toggleFocused(true)
  inputRef.value.rootRef.focus()
}

function documentFocusinEventListener() {
  if (!inputRef.value?.rootRef || !document.activeElement) {
    return
  }

  toggleFocused(document.activeElement.isEqualNode(inputRef.value.rootRef))
}
</script>

<template>
  <div ref="rootRef" class="c-combobox relative flex flex-row">
    <Input
      ref="inputRef"
      v-model="input"
      :color="props.color"
      :border="props.border"
      :size="props.size"
      :rounded="props.rounded"
      class="w-full"
      :class="[
        show && 'rounded-b-none',
        isFocused
          ? `!box-color__${props.color}--4`
          : `!box-color__${props.color}--3`,
      ]"
    />
    <VirtualList
      v-if="dirty"
      v-show="show"
      ref="listComponent"
      v-bind="objectPick(props, ['dataComponent', 'dataKey'])"
      :data-component="props.dataComponent"
      :data-key="props.dataKey"
      :data-ids="dataIds"
      :data-getter="dataGetter"
      :keeps="40"
      :page-mode="false"
      :wrap-class="[
        'flex flex-col w-full',
        props.color && `list-color__${props.color}`,
      ]"
      class="flex flex-col items-center absolute top-full left-0 right-0 max-h-100 overflow-auto scrollbar scrollbar-rounded rounded-t-none border border-t-none z-1"
      :class="[
        props.rounded && `box-rounded__${props.rounded}`,
        props.color && `box-color__${props.color}--2`,
      ]"
      :estimate-size="50"
      :item-class-add="itemClassAdd"
      @item-click="itemClickHandler"
      @item-hover="itemHoverHandler"
    />
    <Button
      v-if="input.length === 0"
      size="sm"
      outline
      tabindex="-1"
      :color="props.color"
      class="absolute right-0 top-0 bottom-0 rounded-l-none"
      :class="[
        show && `rounded-b-none`,
        isFocused
          ? `!box-color__${props.color}--4`
          : `!box-color__${props.color}--3`,
      ]"
      @click="inputFocusHandler"
    >
      <i v-if="!isFocused" class="i-carbon:caret-down inline-block h-6" />
      <i v-else class="i-carbon:caret-up inline-block h-6" />
    </Button>
    <Button
      v-else
      size="sm"
      outline
      tabindex="-1"
      :color="props.color"
      class="absolute right-0 top-0 bottom-0 rounded-l-none"
      :class="[
        show && `rounded-b-none`,
        isFocused
          ? `!box-color__${props.color}--4`
          : `!box-color__${props.color}--3`,
      ]"
      @click="inputCleanHandler"
    >
      <i class="i-carbon:close inline-block h-6" />
    </Button>
  </div>
</template>
