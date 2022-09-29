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

const index = toRef(props, 'index')
const item = toRef(props, 'item')
</script>

<template>
  <div v-if="item" class="flex flex-col text-xs text-gray-400">
    <Card>
      <template #header>
        {{ `# ${index}.${item._id}` }}
      </template>
      <template #default>
        {{ item }}
      </template>
    </Card>
  </div>
</template>
