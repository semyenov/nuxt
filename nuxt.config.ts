import { resolve } from 'pathe'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,

  srcDir: resolve(__dirname, 'src'),
  appDir: resolve(__dirname, 'src', 'app'),

  appConfig: {
    apiUri: 'http://localhost:3000',
  },

  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },

  imports: {
    dirs: ['store', 'composables'],
  },

  app: {
    head: {
      charset: 'utf-8',
      title: 'A Better Nuxt 3 Starter',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
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
