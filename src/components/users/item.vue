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

const rootEl = ref<HTMLElement | undefined>()

const item = toRef(props, 'item')
const [isOpen, toggleOpen] = useToggle(false)

const winBox = ref<WinBox | null>(null)
const id = computed(() => {
  return `users-winbox__${item.value._id}`
})

const teleportRef = ref<HTMLElement | undefined>()

const winBoxOptions = computed<WinBox.Params>(() => {
  return {
    id: id.value,
    border: 10,
    root: rootEl.value,
    title: `${item.value.info.first_name} ${item.value.info.last_name} `,
    class: 'simple',
    top: 0,
    right: 0,
    bottom: 0,
    width: '30%',
    minwidth: '480px',
    height: '100%',
    x: 'right',
    hidden: true,
    onclose() {
      if (!this) {
        return false
      }

      toggleOpen(false)
      this.unmount()

      nextTick(() => {
        winBox.value = null
      })

      return false
    },
  }
})

onMounted(() => {
  const teleportEl = document.createElement('div')
  const contentEl = document.createElement('div')

  teleportEl.classList.add('wb-content')
  teleportEl.appendChild(contentEl)
  teleportRef.value = teleportEl

  rootEl.value = document.getElementById('teleport') as HTMLElement
})

watch(id, () => {
  const w = winBox.value
  if (!w) {
    return
  }

  w.close()
})

onUnmounted(() => {
  const w = winBox.value
  if (!w) {
    return
  }

  w.close()
})

onDeactivated(() => {
  const w = winBox.value
  if (!w) {
    return
  }

  w.close()
})

function clickHandler() {
  if (winBox.value) {
    const w = winBox.value
    w.show()
    w.minimize(false)
    w.focus()
    return
  }

  winBox.value = new window.WinBox(winBoxOptions.value)

  const w = winBox.value
  if (!w) {
    return
  }

  w.mount(teleportRef.value)
  w.show()

  toggleOpen(true)

  nextTick(() => {
    w.show()
    w.minimize(false)
    w.focus()
  })
}

function handleChange() {
  item.value.mandate = item.value.mandate ? item.value.mandate + 1 : 0
}
</script>

<template>
  <div v-if="item" class="component-user-item">
    <Card dashed color="third">
      <template v-if="item.info.first_name && item.info.last_name" #header>
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
      :key="`${id}--${isOpen}`"
      :to="`#teleport #${id} .wb-body .wb-content`"
    >
      <pre class="p-6">{{ item }}</pre>
    </Teleport>
  </div>
</template>
