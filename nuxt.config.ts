import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: resolve(__dirname, 'src'),
  typescript: {
    shim: false,
  },
  meta: {
    title: 'A Better Nuxt 3 Starter',
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  },
  imports: {
    dirs: ['stores'],
  },
  css: ['@unocss/reset/antfu.css'],
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt', 'magic-regexp/nuxt'],
})
