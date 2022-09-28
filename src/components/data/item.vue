<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object as PropType<{ _id: string; name: string }>,
  },
})
</script>

<template>
  <div v-if="props.item" class="flex flex-col text-xs text-gray-400">
    <Card>
      <template #header>
        {{ `${props.item._id}. ${props.item.name}` }}
      </template>
      <template #default>
        {{ props.item }}
      </template>
    </Card>
  </div>
</template>
