<script setup lang="ts">
import { objectPick } from '@antfu/utils'
import type { PropType } from 'vue'
import type {
  UIColorVariants,
  UIRoundedVariants,
  UISizeVariants,
} from '@/types/ui'

const props = defineProps({
  color: {
    type: String as PropType<UIColorVariants>,
    default: 'gray',
  },
  size: {
    type: String as PropType<UISizeVariants>,
    default: 'md',
  },
  rounded: {
    type: String as PropType<UIRoundedVariants>,
    default: 'md',
  },
  outline: {
    type: Boolean,
    default: false,
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

const input = ref<string>('аге')

const options = toRef(props, 'options')
const dataIds = computed(() =>
  options.value
    .filter((item) => findByOptionsFields(item, ['info', 'name'], input.value))
    .map((item) => item._id)
)
const dataGetter = async (id: string) =>
  computed(() => options.value.find((item) => item._id === id))

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
</script>

<template>
  <div class="c-combobox relative">
    <Input
      v-bind="
        objectPick(props, ['border', 'color', 'outline', 'rounded', 'size'])
      "
      v-model="input"
    />
    <VirtualList
      ref="listRef"
      key="data-virtuallist"
      v-bind="objectPick(props, ['dataComponent', 'dataKey'])"
      :data-ids="dataIds"
      :data-getter="dataGetter"
      :keeps="50"
      :page-mode="false"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center absolute top-full left-0 right-0 max-h-80 overflow-auto box-color__default--2 border"
      :estimate-size="800"
    >
      <template #item="{ item }">
        {{ item.label }}
      </template>
    </VirtualList>
  </div>
</template>
