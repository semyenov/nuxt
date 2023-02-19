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

const winBox = ref<WinBox | null>(null)

const rootEl = ref<HTMLElement | undefined>()
const winBoxEl = ref<HTMLElement | undefined>()

const item = toRef(props, 'item')
const [isOpen, toggleOpen] = useToggle(false)

const id = computed(() => {
  return `users-winbox__${item.value._id}`
})

onMounted(prepare)
onActivated(prepare)
watch(id, clean)

function clickHandler() {
  const w = winBox.value
  if (w && w.id === id.value) {
    w.focus().minimize(false)

    return
  }

  const winBoxOptions = getWinBoxOptions()
  winBox.value = new window.WinBox(winBoxOptions)

  nextTick(() => {
    const w = winBox.value
    if (!w) {
      return
    }

    w.mount(winBoxEl.value)
    toggleOpen(true)
    w.show()
  })
}

function getWinBoxOptions() {
  return {
    id: id.value,
    hidden: true,
    border: 10,
    root: rootEl.value,
    title: `${item.value.info.first_name} ${item.value.info.last_name} `,
    class: 'simple',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: '30%',
    minwidth: '480px',
    height: '100%',
    x: 'right',
    y: 'center',

    onclose() {
      toggleOpen(false)
      return false
    },
  }
}

function prepare() {
  if (winBox.value) {
    return
  }

  const teleportEl = document.createElement('div')
  const contentEl = document.createElement('div')

  contentEl.classList.add('wb-content')
  teleportEl.classList.add('wb-teleport')
  teleportEl.appendChild(contentEl)
  winBoxEl.value = teleportEl

  rootEl.value = document.getElementById('teleport') as HTMLElement
}

function clean() {
  if (!winBox.value) {
    return
  }

  winBox.value.close()
  winBox.value = null

  if (rootEl.value) {
    rootEl.value.remove()
    rootEl.value = undefined
  }

  if (winBoxEl.value) {
    winBoxEl.value.remove()
    winBoxEl.value = undefined
  }
}

function handleChange() {
  item.value.mandate = item.value.mandate ? item.value.mandate + 1 : 0
}
</script>

<template>
  <div :key="id" class="component-user-item">
    <Card dashed color="third">
      <template v-if="item" #header>
        <div
          class="flex flex-row justify-between px-4 py-2 w-full cursor-pointer"
          @click="clickHandler"
        >
          {{ `# ${item.info.first_name} ${item.info.last_name}` }}
          <div
            class="inline-flex px-2 box-color__zinc--3 bg-white box-rounded__md border font-mono font-light text-sm"
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
    <Teleport
      v-if="isOpen"
      :key="`users-teleport-${id}`"
      :to="`#teleport #${id} .wb-body .wb-content`"
    >
      <pre class="p-4">{{ item }}</pre>
    </Teleport>
  </div>
</template>
