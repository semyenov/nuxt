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
      <NuxtLink
        :to="{ name: 'objects-id', params: { id: item._id } }"
        class="flex flex-row justify-between px-4 py-2 w-full cursor-pointer"
      >
        {{ `# ${item.info.name}` }}
        <div
          class="inline-flex px-2 box-color__zinc--3 bg-white box-rounded__md border font-mono font-light text-sm"
        >
          {{ item.feature?.geometry.coordinates.join(', ') }}
        </div>
      </NuxtLink>
    </template>
    <!-- <template #default>
      <pre class="px-4 py-2 text-xs">{{ item }}</pre>
    </template> -->
    <template #footer>
      <div class="px-4 py-1.5">{{ item._id }}</div>
    </template>
  </Card>
</template>
