<script setup lang="ts">
import type { PropType } from 'vue'
import type { IObject } from '@/types'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object as PropType<IObject>,
    required: true,
  },
})

const item = toRef(props, 'item')
</script>

<template>
  <div
    v-if="item"
    class="px-4 py-2 text-left cursor-pointer flex flex-row items-center gap-4"
  >
    <i class="i-carbon:download inline-block" />
    {{ item.info.name }}
  </div>
</template>
