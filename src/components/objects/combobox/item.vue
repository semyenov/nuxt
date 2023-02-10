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
  <div v-if="item" class="px-4 py-2 box-color__default--2">
    {{ item.info.name }}
  </div>
</template>
