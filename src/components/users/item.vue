<script setup lang="ts">
import type { PropType } from 'vue'
// import { nanoid } from 'nanoid'

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

const id = ref<string>()
const item = toRef(props, 'item')
const [isOpen, toggleOpen] = useToggle(false)

onScopeDispose(() => {
  const w = getCurrentWinBox()
  if (!w) {
    return
  }
  w.close()
})

function clickHandler() {
  const w = getCurrentWinBox()
  if (w) {
    w.minimize(false).focus()

    return
  }

  id.value = `id-${hash(item.value._id)}`
  const title = `${item.value.info.first_name} ${item.value.info.last_name}`

  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')
  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const rootEl = document.body as HTMLElement
  const winBoxOptions = createWinBoxOptions(id.value, title, rootEl, mountEl)

  winBox.value = new window.WinBox(winBoxOptions)

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
    index: 100,
    title,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    width: '550px',
    height: '100%',
    minwidth: '500px',
    class: ['simple', 'no-max', 'no-full'],
    x: 'right',
    y: 0,
    mount,
    root,
    id,

    onclose(force) {
      nextTick(() => {
        toggleOpen(false)
      })

      return force || false
    },
  }
}

function getCurrentWinBox() {
  if (!id.value) {
    return
  }

  const el = document.getElementById(id.value) as HTMLElement & {
    winbox?: WinBox
  }

  return el && el.winbox
}

function handleChange() {
  item.value.mandate =
    item.value.mandate !== undefined ? item.value.mandate + 1 : 0
}
</script>

<template>
  <div class="component-user-item">
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
    <Teleport v-if="isOpen" :to="`#${id} .wb-body .wb-content`">
      <pre class="p-6 text-sm">{{ item }}</pre>
    </Teleport>
  </div>
</template>
