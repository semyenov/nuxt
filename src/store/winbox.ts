import { debounce } from '@antfu/utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type WinBox from 'winbox'

interface IWindowInfo {
  x: number
  y: number
  width: number
  height: number
  fullscreen: boolean
  minimized: boolean
  maximized: boolean
  active: boolean
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

export const winboxStoreKey = 'winbox' as const
export const useWinboxStore = defineStore('winbox', () => {
  const mouse = useMouse()
  const windows = ref<Map<string, IWindowInfo>>(new Map())

  function register(id: string, params: WinBoxParams) {
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

    // const update = ref<boolean>(false)

    const onclose = params.onclose
    const onresize = params.onresize
    const onmove = params.onmove
    const onfocus = params.onfocus
    const onblur = params.onblur
    const onminimize = params.onminimize
    const onmaximize = params.onmaximize
    const onrestore = params.onrestore
    const onfullscreen = params.onfullscreen

    const resizeEventListener = debounce(50, () => {
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
    })

    params.onminimize = function () {
      console.log('onminimize')

      if (!w) {
        return
      }

      w.minimized = true

      return !!onminimize && onminimize.call(this)
    }

    params.onmaximize = function (state = true) {
      console.log('onmaximize')

      if (!w) {
        return
      }

      w.maximized = state

      return !!onmaximize && onmaximize.call(this, state)
    }

    params.onfullscreen = function () {
      console.log('onfullscreen')

      if (!w) {
        return
      }

      w.fullscreen = true

      return !!onfullscreen && onfullscreen.call(this)
    }

    params.onrestore = function () {
      console.log('onrestore')

      if (!w) {
        return
      }

      w.maximized = false
      w.minimized = false

      resizeEventListener()

      return !!onrestore && onrestore.call(this)
    }

    params.onclose = function (forceFlag = false) {
      console.log('onclose')

      windows.value.delete(id)
      window.removeEventListener('resize', resizeEventListener)

      return !!onclose && onclose.call(this, forceFlag)
    }

    params.onresize = function (width, height) {
      console.log('onresize')

      if (!w) {
        return
      }

      w.height = height
      w.width = width

      return !!onresize && onresize.call(this, width, height)
    }

    params.onmove = function (x, y) {
      console.log('onmove')

      if (!w) {
        return
      }

      w.x = x
      w.y = y

      return !!onmove && onmove.call(this, x, y)
    }

    params.onfocus = function () {
      console.log('onfocus')

      if (!w) {
        return
      }

      w.minimized = false
      w.active = true

      return !!onfocus && onfocus.call(this)
    }

    params.onblur = function () {
      console.log('onblur')

      if (!w) {
        return
      }

      w.active = false

      return !!onblur && onblur.call(this)
    }

    winbox = new window.WinBox(params)

    if (!windows.value.has(id)) {
      windows.value.set(id, {
        x: winbox.body.parentElement?.offsetLeft || 0,
        y: winbox.body.parentElement?.offsetTop || 0,
        width: winbox.body.parentElement?.clientWidth || 0,
        height: winbox.body.parentElement?.clientHeight || 0,
        minimized: false,
        fullscreen: false,
        active: false,
        maximized: winbox.max,
      })
    }

    w = windows.value.get(id)!
    window.addEventListener('resize', resizeEventListener)
    resizeEventListener()

    return winbox
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
