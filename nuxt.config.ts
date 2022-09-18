import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: resolve(__dirname, 'src'),
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  css: ['@unocss/reset/antfu.css'],
})
