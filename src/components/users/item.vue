<script setup lang="ts">
import type { PropType } from 'vue'
import { hash } from 'ohash'

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

const item = toRef(props, 'item')
const [isOpen, toggleOpen] = useToggle(false)

const id = ref<string>()

watch([isOpen], (o) => {
  if (!o) {
    clean()
  }
})

onDeactivated(clean)
onUnmounted(clean)

function clickHandler() {
  const w = winBox.value
  if (w && w.id === id.value) {
    w.minimize()

    return
  }

  id.value = createId()
  const title = `${item.value.info.first_name} ${item.value.info.last_name}`

  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')
  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const rootEl = document.getElementById('teleport') as HTMLElement
  const winBoxOptions = createWinBoxOptions(id.value, title, rootEl, mountEl)
  const newWinBox = new window.WinBox(winBoxOptions)
  winBox.value = newWinBox

  nextTick(() => {
    if (!winBox.value) {
      return
    }

    toggleOpen(true)
  })
}

function createWinBoxOptions(
  id: string,
  title: string,
  root: HTMLElement,
  mount: HTMLElement
): WinBox.Params {
  return {
    title,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    border: 10,
    width: '30%',
    height: '100%',
    minwidth: '480px',
    class: 'simple',
    x: 'right',
    y: 'center',
    mount,
    root,
    id,

    onclose(force) {
      toggleOpen(false)

      nextTick(() => {
        winBox.value = null
      })

      return force || false
    },
  }
}

function createId() {
  const ts = new Date().getUTCMilliseconds() + Math.random() + 1000
  return `users-winbox__${hash(item.value._id + ts.toFixed(0).toString())}`
}

function clean() {
  if (!winBox.value || !winBox.value.body) {
    return
  }

  winBox.value.close()
}

function handleChange() {
  item.value.mandate = item.value.mandate ? item.value.mandate + 1 : 0
}
</script>

<template>
  <div class="component-user-item">
    <Card dashed color="third">
      <template v-if="item" #header>
        <div
          class="flex flex-row justify-between px-4 py-2 w-full cursor-pointer"
          @click="() => clickHandler()"
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
      :key="`${id}-teleport`"
      :to="`#teleport #${id} .wb-body .wb-content`"
    >
      <pre class="p-4">{{ item }}</pre>
    </Teleport>
  </div>
</template>
