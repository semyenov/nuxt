<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object as PropType<{ _id: string; name: string; height: string }>,
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
      <pre>{{ item }}</pre>
    </template>
    <template #footer>
      <div
        class="flex flex-col items-center justify-center"
        :style="{ height: item.height }"
      >
        {{ `+${item.height}` }}
      </div>
    </template>
  </Card>
</template>
