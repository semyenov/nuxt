import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,

  srcDir: resolve(__dirname, 'src'),

  typescript: {
    shim: false,
  },

  imports: {
    dirs: ['store', 'composables'],
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

  css: ['@unocss/reset/antfu.css', '@/assets/styles/main.css'],

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'magic-regexp/nuxt',

    '@/modules/test/index',
  ],
})
