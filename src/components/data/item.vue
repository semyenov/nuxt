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
</script>

<template>
  <Card v-if="props.item">
    <template v-if="props.item.name" #header>
      <NuxtLink :to="`/data/${props.item._id}`" class="w-full">
        <div class="p-4">{{ `# ${props.item.name}` }}</div>
      </NuxtLink>
    </template>
    <template #default>
      <pre class="p-4">{{ props.item }}</pre>
    </template>
    <template #footer>
      <div
        class="flex flex-col props.items-center justify-center py-2 px-4"
        :style="{ height: props.item.height }"
      >
        {{ `+${props.item.height}` }}
      </div>
    </template>
  </Card>
</template>
