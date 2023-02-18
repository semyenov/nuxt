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
  <Card v-if="item" dashed color="secondary">
    <template v-if="item.info.name" #header>
      <NuxtLink :to="`/objects/${item._id}`" class="w-full">
        <div class="px-4 py-2">{{ `# ${item.info.name}` }}</div>
      </NuxtLink>
    </template>
    <template #default>
      <pre class="px-4 py-2 text-xs">{{ item }}</pre>
    </template>
    <template #footer>
      <div class="px-4 py-1.5">test</div>
    </template>
  </Card>
</template>
