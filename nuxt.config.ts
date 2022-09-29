import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,

  srcDir: resolve(__dirname, 'src'),

  appDir: resolve(__dirname, 'src', 'app'),

  typescript: {
    shim: false,
  },

  imports: {
    dirs: ['store', 'composables'],
  },

  app: {
    head: {
      title: 'A Better Nuxt 3 Starter',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
      style: [
        {
          type: 'text/css',
          children: ':root { color: red }',
        },
      ],
      script: [{ src: 'http://localhost:8098' }],
    },
  },

  css: ['@unocss/reset/antfu.css', 'assets/styles/main.css'],

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'magic-regexp/nuxt',

    '@/modules/test/index',
  ],
})
