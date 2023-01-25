<script setup lang="ts">
import type { PropType } from 'vue'
import type { IObject, IObjectUpdateInput } from '@/types'

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
  <Card v-if="item">
    <template v-if="item.info.name" #header>
      <NuxtLink :to="`/objects/${item._id}`" class="w-full">
        <div class="p-4">{{ `# ${item.info.name}` }}</div>
      </NuxtLink>
    </template>
    <template #default>
      <pre class="p-4">{{ item }}</pre>
    </template>
    <!-- <template #footer>
      <div
        class="flex flex-col flex-grow cursor-pointer items-center justify-center py-2 px-4"
        :style="{ height: item.height }"
        @click="updateItem"
      >
        {{ `+${item.height}` }}
      </div>
    </template> -->
  </Card>
</template>
