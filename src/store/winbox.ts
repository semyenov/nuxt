import { debounce } from '@antfu/utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type WinBox from 'winbox'

interface IWindowInfo {
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
}

export type WinBoxParamsTether = 'right' | 'left' | 'top' | 'bottom'
export type WinBoxParams = WinBox.Params & {
  tether?: WinBoxParamsTether[]
}

export const winboxStoreKey = 'winbox' as const
export const useWinboxStore = defineStore('winbox', () => {
  const mouse = useMouse()
  const windows = ref<Map<string, IWindowInfo>>(new Map())

  function register(id: string, params: WinBoxParams) {
    if (params.tether && params.tether.includes('right')) {
      params.x = window.innerWidth

      if (params.tether.includes('bottom')) {
        params.y = window.innerHeight
      }

      if (params.tether.includes('top')) {
        params.y = 0
      }
    }

    const winbox = new window.WinBox(params)
    const body = winbox.body

    const update = ref<boolean>(false)

    const onclose = params.onclose
    const onresize = params.onresize
    const onmove = params.onmove
    const onfocus = params.onfocus
    const onblur = params.onblur
    const onminimize = params.onminimize
    const onmaximize = params.onmaximize
    const onrestore = params.onrestore

    if (!windows.value.has(id)) {
      windows.value.set(id, {
        x: body.parentElement?.offsetLeft || 0,
        y: body.parentElement?.offsetTop || 0,
        width: body.parentElement?.clientWidth || 0,
        height: body.parentElement?.clientHeight || 0,
        minimized: false,
        maximized: winbox.max,
      })
    }

    const w = windows.value.get(id)!

    watch([update], ([upd]) => {
      if (!w || !upd) {
        return
      }

      winbox.move(w.x, w.y)
      winbox.resize(w.width, w.height)
      update.value = false
    })

    const resizeEventListener = debounce(50, () => {
      if (!w || !params.tether || w.minimized || w.maximized) {
        return
      }

      if (params.tether.includes('left')) {
        w.x = typeof params.left === 'number' ? params.left : 0

        if (params.tether.includes('top')) {
          w.y = typeof params.top === 'number' ? params.top : 0
        }

        if (params.tether.includes('bottom')) {
          w.height = window.innerHeight
        }

        update.value = true

        return
      }

      if (params.tether.includes('right')) {
        w.x =
          typeof params.right === 'number'
            ? window.innerWidth - w.width - params.right
            : window.innerWidth - w.width

        if (params.tether.includes('top')) {
          w.y = typeof params.top === 'number' ? params.top : 0
        }

        if (params.tether.includes('bottom')) {
          w.height = window.innerHeight
        }

        update.value = true
      }
    })

    window.addEventListener('resize', resizeEventListener)
    resizeEventListener()

    winbox.onminimize = function () {
      if (!w) {
        return this
      }

      w.minimized = true

      return !!onminimize && onminimize.call(this)
    }

    winbox.onmaximize = function () {
      if (!w) {
        return this
      }

      w.maximized = true

      return !!onmaximize && onmaximize.call(this)
    }

    winbox.onrestore = function () {
      if (!w) {
        return this
      }

      w.maximized = false
      w.minimized = false
      resizeEventListener()

      return !!onrestore && onrestore.call(this)
    }

    winbox.onclose = function (forceFlag = false) {
      windows.value.delete(id)
      window.removeEventListener('resize', resizeEventListener)

      return !!onclose && onclose.call(this, forceFlag)
    }

    winbox.onresize = function (width, height) {
      if (!w) {
        return
      }

      w.height = height
      w.width = width

      return !!onresize && onresize.call(this, width, height)
    }

    winbox.onmove = function (x, y) {
      if (!w) {
        return
      }

      w.x = x
      w.y = y

      return !!onmove && onmove.call(this, x, y)
    }

    winbox.onfocus = function () {
      if (!w) {
        return
      }

      w.minimized = false

      return !!onfocus && onfocus.call(this)
    }

    winbox.onblur = function () {
      if (!w) {
        return
      }

      return !!onblur && onblur.call(this)
    }

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
