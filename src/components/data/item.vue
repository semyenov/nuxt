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
  <Card v-if="item">
    <template v-if="item.name" #header>
      {{ `# ${item.name}` }}
    </template>
    <template #default>
      {{ item }}
    </template>
    <template #footer>
      {{ item }}
    </template>
  </Card>
</template>
