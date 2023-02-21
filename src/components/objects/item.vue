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

const [showFlag, showToggle] = useToggle(false)
const item = toRef(props, 'item')
</script>

<template>
  <div class="component-object-item">
    <Card
      dashed
      :color="showFlag ? 'fourth' : 'secondary'"
      class="cursor-pointer select-none"
      @click="showToggle()"
    >
      <template v-if="item" #header>
        <div class="flex flex-row justify-between px-4 py-2 w-full">
          {{ `# ${item.info.name}` }}

          <div
            v-if="item.feature && item.feature.geometry.coordinates[1]"
            class="inline-flex flex-row items-center px-2 box-color__default--6 box-rounded__sm border border-dashed font-mono font-light text-sm"
          >
            {{ item.feature.geometry.coordinates.join(', ') }}
          </div>
        </div>
      </template>
      <template #footer>
        <div class="px-4 py-1.5">
          {{ item._id }}
        </div>
      </template>
    </Card>
    <Winbox
      v-model:show="showFlag"
      teleport-id="teleport-layer--20"
      :params="{
        index: 100,
        title: `${item.info.name}`,
        top: 0,
        right: 0,
        left: '44px',
        bottom: 0,
        border: 0,
        width: '550px',
        height: '100%',
        minwidth: '500px',
        class: ['simple'],
        x: 'right',
        y: 'top',
      }"
    >
      <pre class="p-6 text-sm">{{ item }}</pre>
    </Winbox>
  </div>
</template>
