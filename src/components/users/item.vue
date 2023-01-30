<script setup lang="ts">
import type { PropType } from 'vue'
import type { IUser } from '@/types'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object as PropType<IUser>,
    required: true,
  },
})

const item = toRef(props, 'item')
</script>

<template>
  <Card v-if="item">
    <template v-if="item.info.first_name && item.info.last_name" #header>
      <NuxtLink :to="`/users/${item._id}`" class="w-full">
        <div class="p-4">
          {{ `# ${item.info.first_name} ${item.info.last_name}` }}
        </div>
      </NuxtLink>
    </template>
    <template #default>
      <pre class="p-4">{{ item }}</pre>
    </template>
  </Card>
</template>
