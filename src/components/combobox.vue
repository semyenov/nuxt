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

const dirtyFlag = ref(false)
const [focusFlag, toggleFocused] = useToggle(false)

const rootRef = ref<HTMLElement | null>(null)
const inputComponent = ref<InstanceType<typeof Input> | null>(null)
const listComponent = ref<InstanceType<typeof VirtualList> | null>(null)

const input = ref<string>('')

const options = toRef(props, 'options')
const dataIds = computed(() =>
  dirtyFlag.value
    ? options.value
        .filter((item) => filterByField(item, props.searchFields, input.value))
        .map((item) => item._id)
    : []
)
const dataGetter = async (id: string) =>
  computed(() => options.value.find((item) => item._id === id))

const showFlag = computed(() => focusFlag.value && dataIds.value.length > 0)
const cursor = ref(dataIds.value.findIndex((id) => id === props.modelValue))

watch(focusFlag, () => (dirtyFlag.value = true))

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
  if (!focusFlag.value || !props.modelValue) {
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
  if (!focusFlag.value) {
    return
  }

  event.preventDefault()

  cursor.value = clamp(cursor.value - 1, 0, dataIds.value.length - 1)
  if (listComponent.value) {
    listComponent.value.scrollToIndex(cursor.value)
  }
})

onKeyStroke('ArrowDown', (event) => {
  if (!focusFlag.value) {
    return
  }

  event.preventDefault()

  cursor.value = clamp(cursor.value + 1, 0, dataIds.value.length - 1)
  if (listComponent.value) {
    listComponent.value.scrollToIndex(cursor.value)
  }
})

onKeyStroke('Enter', async (event) => {
  if (!focusFlag.value || cursor.value < 0) {
    return
  }

  event.preventDefault()

  itemClickHandler(cursor.value)
})

onMounted(() => {
  if (!inputComponent.value?.rootRef) {
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
  if (!inputComponent.value?.rootRef) {
    return
  }

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

  return `box-color__${props.color}--2`
}

async function itemClickHandler(n: number) {
  cursor.value = n
  const itemId = dataIds.value[cursor.value]
  const item = await dataGetter(itemId)
  if (!item.value) {
    return
  }

  emit('update:modelValue', itemId)

  if (!inputComponent.value?.rootRef) {
    return
  }

  toggleFocused(false)
  inputComponent.value.rootRef.blur()

  const field = getField(item.value, props.searchFields)
  const str = field ? field.toString() : ''

  input.value = str
}

async function itemHoverHandler(n: number) {
  cursor.value = n
}

function inputCleanHandler() {
  if (!inputComponent.value?.rootRef) {
    return
  }

  emit('update:modelValue', '')

  toggleFocused(true)
  input.value = ''
  cursor.value = -1
  inputComponent.value.rootRef.focus()
}

function inputFocusHandler() {
  if (!inputComponent.value?.rootRef) {
    return
  }

  toggleFocused(true)
  inputComponent.value.rootRef.focus()
}

function documentFocusinEventListener() {
  if (!inputComponent.value?.rootRef || !document.activeElement) {
    return
  }

  toggleFocused(
    document.activeElement.isEqualNode(inputComponent.value.rootRef)
  )
}
</script>

<template>
  <div ref="rootRef" class="c-combobox relative flex flex-row">
    <Input
      ref="inputComponent"
      v-model="input"
      :color="props.color"
      :border="props.border"
      :size="props.size"
      :rounded="props.rounded"
      class="w-full"
      :class="[
        showFlag && 'rounded-b-none',
        focusFlag
          ? `!box-color__${props.color}--3`
          : `!box-color__${props.color}--2`,
      ]"
    />
    <VirtualList
      v-if="dirtyFlag"
      v-show="showFlag"
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
      class="absolute left-0 right-0 top-full z-1 max-h-100 flex flex-col items-center overflow-auto border rounded-t-none border-t-none scrollbar scrollbar-rounded"
      :class="[
        props.rounded && `box-rounded__${props.rounded}`,
        props.color && `box-color__${props.color}--4`,
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
      class="absolute bottom-0 right-0 top-0 rounded-l-none"
      :class="[
        showFlag && `rounded-b-none`,
        focusFlag
          ? `!box-color__${props.color}--3`
          : `!box-color__${props.color}--2`,
      ]"
      @click="inputFocusHandler"
    >
      <i v-if="!focusFlag" class="i-carbon:caret-down inline-block h-6" />
      <i v-else class="i-carbon:caret-up inline-block h-6" />
    </Button>
    <Button
      v-else
      size="sm"
      outline
      tabindex="-1"
      :color="props.color"
      class="absolute bottom-0 right-0 top-0 rounded-l-none"
      :class="[
        showFlag && `rounded-b-none`,
        focusFlag
          ? `!box-color__${props.color}--3`
          : `!box-color__${props.color}--2`,
      ]"
      @click="inputCleanHandler"
    >
      <i class="i-carbon:close inline-block h-6" />
    </Button>
  </div>
</template>
