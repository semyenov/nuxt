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

const { index, item } = toRefs(props)
</script>

<template>
  <Card>
    <template #header>
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
