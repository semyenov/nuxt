import WinBox from 'winbox/src/js/winbox'

import type { WinBoxConstructor } from 'winbox'

declare global {
  interface Window {
    WinBox: WinBoxConstructor
  }
}

export default defineNuxtPlugin(async (_nuxtApp) => {
  _nuxtApp.hooks.hookOnce('page:finish', () => {
    window.WinBox = WinBox
  })
})
