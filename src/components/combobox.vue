<script setup lang="ts">
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
  options: {
    type: Object as PropType<{ label: string; value: any }[]>,
    required: true,
  },
})
const options = toRef(props, 'options')
const optionsIds = computed(() => options.value.map((item) => item.label))
const optionGetter = async (label: string) =>
  computed(() => options.value.find((item) => item.label === label))
</script>

<template>
  <div class="c-combobox relative">
    <Input v-bind="props" />
    <VirtualList
      ref="listRef"
      key="data-virtuallist"
      :keeps="50"
      :page-mode="false"
      :data-ids="optionsIds"
      :data-getter="optionGetter"
      data-key="data-virtuallist"
      wrap-class="flex flex-col w-full"
      class="flex flex-col items-center absolute top-full left-0 right-0 max-h-80"
      :estimate-size="800"
      item-class="mb-8"
    >
      <template #item="{ item }">
        {{ item.label }}
      </template>
    </VirtualList>
  </div>
</template>
