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

const id = ref<string>(props.dataId)
const winbox = ref<WinBox | null>(null)
const [showFlag, showToggle] = useToggle(false)

const show = toRef(props, 'show')

defineExpose({
  id,

  open,
  winbox,
})

watch(show, (s) => (s ? open() : close()))
watch(showFlag, (o) => emit('update:show', o))

onMounted(() => show.value && open())
onScopeDispose(close)

function open() {
  const el = getWinboxEl()
  if (el && el.winbox) {
    el.winbox.minimize(false).focus()

    return
  }

  const rootEl = document.getElementById('teleport') || document.body
  const mountEl = document.createElement('div')
  const contentEl = document.createElement('div')

  contentEl.classList.add('wb-content')
  mountEl.appendChild(contentEl)

  const winboxParams = getWinboxParams(id.value, rootEl, mountEl)

  winbox.value = new window.WinBox(winboxParams)
  showToggle(true)

  nextTick(() => {
    if (winboxParams.x === 'right') {
      const el = getWinboxEl()
      if (!el || !el.winbox) {
        return
      }
      const x = window.screenX - el.clientWidth
      el.winbox.move(x, undefined, false)
    }
  })
}

function close() {
  const el = getWinboxEl()
  if (!el || !el.winbox) {
    return
  }

  el.winbox.close()
}

function getWinboxEl() {
  const el = document.getElementById(id.value) as
    | (HTMLElement & {
        winbox?: WinBox
      })
    | null

  return el
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
