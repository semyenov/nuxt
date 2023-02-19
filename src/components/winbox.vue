<script setup lang="ts">
import { nanoid } from 'nanoid'

import type { PropType } from 'vue'
import type WinBox from 'winbox'

const props = defineProps({
  init: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  params: {
    type: Object as PropType<WinBox.Params>,
    default: () => ({}),
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

onMounted(() => props.init && init())

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

  id.value = `id-${nanoid(8)}`

  const rootEl = document.getElementById('teleport') || document.body
  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')

  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const winboxParams = getWinboxParams(id.value, props.title, rootEl, mountEl)
  winbox.value = new window.WinBox(winboxParams)

  nextTick(() => openToggle(true))
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
    border: 10,
    class: 'simple',
    mount,
    root,
    id,

    onclose(force) {
      nextTick(() => openToggle(false))
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
