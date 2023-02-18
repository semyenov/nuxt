import { VueWinBox } from 'vue-winbox'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook('app:mounted', (app) => {
    app.component('WinBox', VueWinBox)
  })
})
