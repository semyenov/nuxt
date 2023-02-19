<script setup lang="ts">
import { nanoid } from 'nanoid'

import type { PropType } from 'vue'
import type WinBox from 'winbox'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  params: {
    type: Object as PropType<WinBox.Params>,
    default: () => ({}),
  },
  init: {
    type: Boolean,
    default: false,
  },
})

const id = ref<string>()
const winbox = ref<WinBox | null>(null)
const [openFlag, openToggle] = useToggle(false)

defineExpose({
  id,

  init,
  getCurrentWinbox,
})

onMounted(() => {
  if (props.init) {
    init()
  }
})

onScopeDispose(() => {
  const w = getCurrentWinbox()
  w && w.close()
})

function init() {
  const w = getCurrentWinbox()
  if (w) {
    w.minimize(false).focus()

    return
  }

  id.value = nanoid(8)

  const rootEl = document.body as HTMLElement

  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')
  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const winBoxParams = getWinboxParams(id.value, props.title, rootEl, mountEl)
  winbox.value = new window.WinBox(winBoxParams)

  nextTick(() => {
    openToggle(true)
  })
}

function getCurrentWinbox() {
  if (!id.value) {
    return
  }

  const el = document.getElementById(id.value) as HTMLElement & {
    winbox?: WinBox
  }

  return el && el.winbox
}

function getWinboxParams(
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

    onresize(w, h) {
      console.log({ w, h })
    },

    onclose(force) {
      nextTick(() => {
        openToggle(false)
      })

      return force || false
    },

    ...props.params,
  }
}
</script>

<template>
  <Teleport v-if="openFlag" :to="`#${id} .wb-content`">
    <slot name="default" />
  </Teleport>
</template>
