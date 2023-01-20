import { resolve } from 'pathe'

import en from './locales/en.json'
import fr from './locales/fr.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,

  srcDir: resolve(__dirname, 'src'),
  appDir: resolve(__dirname, 'src', 'app'),

  typescript: {
    shim: false,
    strict: true,
  },

  imports: {
    dirs: ['store', 'composables'],
  },

  css: ['@unocss/reset/antfu.css', 'assets/styles/main.css'],

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

  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en,
        fr,
      },
    },
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
    base: '/_content',
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'magic-regexp/nuxt',

    '@/modules/test/index',
  ],
})
