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

const [showFlag, showToggle] = useToggle(false)
const item = toRef(props, 'item')

function handleChange() {
  item.value.mandate =
    item.value.mandate !== undefined ? item.value.mandate + 1 : 0
}
</script>

<template>
  <div class="component-user-item">
    <Card
      :color="showFlag ? 'fourth' : 'third'"
      class="cursor-pointer select-none"
      dashed
      @click="showToggle()"
    >
      <template v-if="item" #header>
        <div class="flex flex-row justify-between px-4 py-2 w-full">
          {{ `# ${item.info.first_name} ${item.info.last_name}` }}
          <div
            class="inline-flex px-2 box-color__default--3 bg-white box-rounded__md border font-mono font-light text-sm"
            @click="handleChange"
          >
            {{ item.email }}
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
      :params="{
        title: `${item.info.first_name} ${item.info.last_name}`,
        top: 0,
        bottom: 0,
        left: 44,
        right: 0,
        border: 0,
        width: '550px',
        height: '100%',
        minwidth: '500px',
        x: 'right',
      }"
    >
      <pre class="p-6 text-sm">{{ item }}</pre>
    </Winbox>
  </div>
</template>
