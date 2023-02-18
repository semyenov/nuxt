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
const [isOpen, toggleOpen] = useToggle(false)

const winBox = ref<WinBox | null>(null)
const id = computed(() => {
  return `users-winbox__${item.value._id}`
})

const winBoxRef = ref<HTMLElement | null>(null)
const winBoxOptions = computed<WinBox.Params>(() => {
  return {
    title: item.value.email,
    class: 'simple',
    index: props.index,
    splitscreen: true,
    x: 'center',
    y: 'center',
    width: '50%',
    height: '50%',
    id: id.value, //
    onclose: () => {
      toggleOpen(false)

      nextTick(() => {
        if (!winBox.value) {
          return
        }

        winBox.value.hide()
      })

      return true
    },
  }
})

function clickHandler() {
  if (!winBox.value) {
    winBox.value = new window.WinBox(winBoxOptions.value)
  }

  nextTick(() => {
    toggleOpen(true)

    if (!winBox.value) {
      return
    }

    winBox.value.show()
    winBox.value.minimize(false)
    winBox.value.focus()
  })
}
</script>

<template>
  <div v-if="item" class="component-user-item">
    <Card color="third">
      <template v-if="item.info.first_name && item.info.last_name" #header>
        <div class="p-4 w-full cursor-pointer" @click="clickHandler">
          {{ `# ${item.info.first_name} ${item.info.last_name}` }}
        </div>
      </template>
      <!-- <template #default>
        <pre class="p-4">{{ item }}</pre>
      </template> -->
      <template #footer>
        <div class="p-4">{{ item.email }}</div>
      </template>
    </Card>
    <Teleport v-if="isOpen" ref="winBoxRef" :to="`#${id} .wb-body`">
      <div class="p-4">
        <pre>{{ item }}</pre>
      </div>
    </Teleport>
  </div>
</template>
