import { throttle } from '@antfu/utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type WinBox from 'winbox'

import { nanoid } from 'nanoid'
import { LazyObjectsItem, LazyUsersItem } from '#components'

const componentsMap = {
  LazyObjectsItem,
  LazyUsersItem,
}

export interface IWindowInfo {
  id: string
  x: number
  y: number
  width: number
  height: number
  fullscreen: boolean
  minimized: boolean
  maximized: boolean
  active: boolean
  show: boolean
}

export type WinBoxParamsTether = 'right' | 'left' | 'top' | 'bottom'
export type WinBoxParams = WinBox.Params & {
  tether?: WinBoxParamsTether[]
}

function convertUnits(value?: string | number) {
  return typeof value === 'number'
    ? value
    : typeof value === 'string'
    ? (parseFloat(value.slice(0, value.length - 1)) * window.innerWidth) / 100
    : 0
}

// const pl = createPromiseLock()
// const components = objectMap(
//   import.meta.glob('@/components/**/item.vue'),
//   (key, promise) => {
//     return [key, pl.run(promise)]
//   }
// )

export const winboxStoreKey = 'winbox' as const
export const useWinboxStore = defineStore('winbox', () => {
  const mouse = useMouse()
  const windows = ref<Map<string, IWindowInfo>>(new Map())

  function register(teleportId: string, params: WinBoxParams) {
    if (params.tether) {
      if (params.tether.includes('right')) {
        params.x = window.innerWidth
      }

      if (params.tether.includes('left')) {
        params.x = -convertUnits(params.width)
      }

      if (params.tether.includes('bottom')) {
        params.y = window.innerHeight
      }

      if (params.tether.includes('top')) {
        params.y = 0
      }
    }

    let w: IWindowInfo
    let winbox: WinBox.WinBox
    const id = `id-${nanoid(8)}`

    // const update = ref<boolean>(false)
    const resizeEventListener = throttle(50, () => resize(params, winbox, w))

    function getWinboxParams(
      id: string,
      root: HTMLElement,
      mount: HTMLElement
    ): WinBoxParams {
      const onclose = params.onclose
      const onresize = params.onresize
      const onmove = params.onmove
      const onfocus = params.onfocus
      const onblur = params.onblur
      const onminimize = params.onminimize
      const onmaximize = params.onmaximize
      const onrestore = params.onrestore
      const onfullscreen = params.onfullscreen

      return {
        header: 45,
        border: 100,
        class: ['simple'],
        mount,
        root,
        id,
        ...params,

        onminimize() {
          console.log('onminimize')

          if (!w) {
            return
          }

          w.minimized = true

          return !!onminimize && onminimize.call(this)
        },

        onmaximize(state = true) {
          console.log('onmaximize')

          if (!w) {
            return
          }

          w.maximized = state

          return !!onmaximize && onmaximize.call(this, state)
        },

        onfullscreen() {
          console.log('onfullscreen')

          if (!w) {
            return
          }

          w.fullscreen = true

          return !!onfullscreen && onfullscreen.call(this)
        },

        onrestore() {
          console.log('onrestore')

          if (!w) {
            return
          }

          w.maximized = false
          w.minimized = false

          resizeEventListener()

          return !!onrestore && onrestore.call(this)
        },

        onclose(forceFlag = false) {
          console.log('onclose')

          windows.value.delete(id)
          window.removeEventListener('resize', resizeEventListener)

          return !!onclose && onclose.call(this, forceFlag)
        },

        onresize(width, height) {
          console.log('onresize')

          if (!w) {
            return
          }

          w.height = height
          w.width = width

          return !!onresize && onresize.call(this, width, height)
        },

        onmove(x, y) {
          console.log('onmove')

          if (!w) {
            return
          }

          w.x = x
          w.y = y

          return !!onmove && onmove.call(this, x, y)
        },

        onfocus() {
          console.log('onfocus')

          if (!w) {
            return
          }

          w.minimized = false
          w.active = true

          return !!onfocus && onfocus.call(this)
        },

        onblur() {
          console.log('onblur')

          if (!w) {
            return
          }

          w.active = false

          return !!onblur && onblur.call(this)
        },
      }
    }

    const rootEl = document.getElementById(teleportId) || document.body
    const mountEl = document.createElement('div')
    const contentEl = document.createElement('div')

    contentEl.classList.add('wb-content')
    mountEl.appendChild(contentEl)

    const winboxParams = getWinboxParams(id, rootEl, mountEl)
    winbox = new window.WinBox(winboxParams)
    winbox.focus()

    if (!windows.value.has(id)) {
      windows.value.set(id, {
        id,
        x: winbox.body.parentElement?.offsetLeft || 0,
        y: winbox.body.parentElement?.offsetTop || 0,
        width: winbox.body.parentElement?.clientWidth || 0,
        height: winbox.body.parentElement?.clientHeight || 0,
        minimized: false,
        fullscreen: false,
        maximized: winbox.max,
        active: true,
        show: true,
      })
    }

    w = windows.value.get(id)!
    window.addEventListener('resize', resizeEventListener)
    resizeEventListener()

    return w
  }

  return {
    register,
    windows,
    mouse,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWinboxStore, import.meta.hot))
}

function resize(params: WinBoxParams, winbox: WinBox.WinBox, w: IWindowInfo) {
  if (!w || !params.tether || w.minimized) {
    return
  }

  if (w.fullscreen) {
    w.fullscreen = false

    return
  }

  if (w.maximized) {
    winbox.maximize(false)
    winbox.maximize(true)

    return
  }

  if (params.tether.includes('left')) {
    w.x = convertUnits(params.left)

    if (params.tether.includes('top')) {
      w.y = convertUnits(params.top)

      if (params.tether.includes('bottom')) {
        w.height = window.innerHeight
        winbox.resize(undefined, w.height)
      }
    }

    winbox.move(w.x, w.y)
    return
  }

  if (params.tether.includes('right')) {
    w.x = window.innerWidth - w.width - convertUnits(params.right)

    if (params.tether.includes('top')) {
      w.y = typeof params.top === 'number' ? params.top : 0

      if (params.tether.includes('bottom')) {
        w.height = window.innerHeight
        winbox.resize(undefined, w.height)
      }
    }

    winbox.move(w.x, w.y)
  }
}
