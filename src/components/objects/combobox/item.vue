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
  <div v-if="item" class="px-4 py-2 text-left cursor-pointer">
    {{ item.info.name }}
  </div>
</template>
