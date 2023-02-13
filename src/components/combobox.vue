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
    type: Object as PropType<string>,
    required: true,
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
  (event: 'update:modelValue', val: string): void
}>()

const [isFocused, toggleFocused] = useToggle(false)

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<InstanceType<typeof Input> | null>(null)
const listRef = ref<InstanceType<typeof VirtualList> | null>(null)

const input = ref<string>('')

const options = toRef(props, 'options')
const dataIds = computed(() =>
  options.value
    .filter((item) => filterByField(item, props.searchFields, input.value))
    .map((item) => item._id)
)
const dataGetter = async (id: string) =>
  computed(() => options.value.find((item) => item._id === id))

const show = computed(() => isFocused.value && dataIds.value.length > 0)
const current = ref(dataIds.value.findIndex((id) => id === props.modelValue))

// watch(current, async (cur) => {
//   if (!inputRef.value || !inputRef.value.rootRef) {
//     return
//   }

//   const itemId = dataIds.value[cur]
//   const item = await dataGetter(itemId)
//   if (!item.value) {
//     return
//   }

//   const field = getTextField(item.value, props.searchFields)
//   const str = field ? field.toString() : ''

//   inputRef.value.rootRef.value = ''
//   inputRef.value.rootRef.placeholder = str
// })

watch(input, (i) => {
  if (!listRef.value || !listRef.value.rootRef) {
    return
  }

  listRef.value.scrollToIndex(0)
  current.value = -1

  if (i !== '' || !inputRef.value || !inputRef.value.rootRef) {
    return
  }

  inputRef.value.rootRef.placeholder = ''
  emit('update:modelValue', '')
})

onClickOutside(rootRef, () => {
  toggleFocused(false)
})

onKeyStroke('ArrowUp', (event) => {
  if (!isFocused) {
    return
  }

  event.preventDefault()

  current.value = clamp(current.value - 1, 0, dataIds.value.length - 1)
  if (listRef.value) {
    listRef.value.scrollToIndex(current.value)
  }
})

onKeyStroke('ArrowDown', (event) => {
  if (!isFocused) {
    return
  }

  event.preventDefault()

  current.value = clamp(current.value + 1, 0, dataIds.value.length - 1)
  if (listRef.value) {
    listRef.value.scrollToIndex(current.value)
  }
})

onKeyStroke('Enter', async (event) => {
  if (!isFocused || current.value < 0) {
    return
  }

  event.preventDefault()

  itemClickHandler(current.value)
})

onMounted(() => {
  if (!inputRef.value || !inputRef.value.rootRef) {
    return
  }

  inputRef.value.rootRef.blur()
  inputRef.value.rootRef.addEventListener('focus', toggleShowHandler)

  if (current.value < 0) {
    return
  }

  itemClickHandler(current.value)
})

onUnmounted(() => {
  if (!inputRef.value || !inputRef.value.rootRef) {
    return
  }

  inputRef.value.rootRef.blur()
  inputRef.value.rootRef.removeEventListener('focus', toggleShowHandler)
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

function getTextField<T extends object>(
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

  const result = travel() || travel()
  return result === undefined || result === obj ? defaultValue : result
}

function itemClassAdd(i: number) {
  if (i === current.value) {
    return props.color && `box-color__${props.color}--3`
  }

  return `box-color__${props.color}--2`
}

function toggleShowHandler() {
  toggleFocused(true)
}

async function itemClickHandler(n: number) {
  current.value = n
  const itemId = dataIds.value[current.value]
  const item = await dataGetter(itemId)
  if (!item.value) {
    return
  }

  emit('update:modelValue', itemId)

  if (!inputRef.value || !inputRef.value.rootRef) {
    return
  }

  toggleFocused(false)
  inputRef.value.rootRef.blur()

  const field = getTextField(item.value, props.searchFields)
  const str = field ? field.toString() : ''

  input.value = str
}
</script>

<template>
  <div ref="rootRef" class="c-combobox relative">
    <Input
      ref="inputRef"
      v-model="input"
      :color="props.color"
      :border="props.border"
      :size="props.size"
      :rounded="props.rounded"
      :class="[show && 'rounded-b-none']"
    />
    <VirtualList
      v-if="show"
      ref="listRef"
      key="data-virtuallist"
      v-bind="objectPick(props, ['dataComponent', 'dataKey'])"
      :data-component="props.dataComponent"
      :data-key="props.dataKey"
      :data-ids="dataIds"
      :data-getter="dataGetter"
      :keeps="25"
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
      :estimate-size="50"
      :on-item-click="itemClickHandler"
      :item-class-add="itemClassAdd"
    />
  </div>
</template>
