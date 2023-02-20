<script setup lang="ts">
import { nanoid } from 'nanoid'

import type { PropType } from 'vue'
import type WinBox from 'winbox'

const props = defineProps({
  dataId: {
    type: String,
    default: () => `id-${nanoid(8)}`,
  },
  show: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object as PropType<WinBox.Params>,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  (event: 'update:show', value: boolean): void
}>()

const input = toRef(props, 'show')

const id = ref<string>(props.dataId)
const winbox = ref<WinBox | null>(null)
const [showFlag, showToggle] = useToggle(false)

defineExpose({
  id,

  init,
  getCurrentWinbox,
})

watch(showFlag, (o) => {
  emit('update:show', o)
})

watch(input, (s) => {
  if (s) {
    init()

    return
  }

  const w = getCurrentWinbox()
  w && w.close()
})

onMounted(() => {
  if (!input.value) {
    return
  }

  init()
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

  const rootEl = document.getElementById('teleport') || document.body
  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')

  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const winboxParams = getWinboxParams(id.value, rootEl, mountEl)
  winbox.value = new window.WinBox(winboxParams)

  nextTick(() => showToggle(true))
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
  root: HTMLElement,
  mount: HTMLElement
): WinBox.Params {
  return {
    // @ts-expect-error fffffuuuuccc...
    header: 45,
    border: 10,
    class: ['simple'],
    mount,
    root,
    id,

    onclose(force) {
      nextTick(() => showToggle(false))
      return force || false
    },

    ...props.params,
  }
}
</script>

<template>
  <Teleport v-if="showFlag" :to="`#${id} .wb-content`">
    <slot name="default" />
  </Teleport>
</template>
