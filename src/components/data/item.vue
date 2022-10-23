<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object as PropType<{ _id: string; name: string; height: string }>,
    required: true,
  },
})

// const index = toRef(props, 'index')
const item = toRef(props, 'item')
</script>

<template>
  <Card v-if="item">
    <template v-if="item.name" #header>
      <NuxtLink :to="`/data/${item._id}`" class="w-full">
        <div class="p-4">{{ `# ${item.name}` }}</div>
      </NuxtLink>
    </template>
    <template #default>
      <pre class="p-4">{{ item }}</pre>
    </template>
    <template #footer>
      <div
        class="flex flex-col items-center justify-center py-2 px-4"
        :style="{ height: item.height }"
      >
        {{ `+${item.height}` }}
      </div>
    </template>
  </Card>
</template>
