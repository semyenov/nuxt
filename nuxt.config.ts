import { resolve } from 'pathe'

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
      script: [
        {
          src: 'https://polyfill.io/v3/polyfill.js?features=es5,es6,es7&flags=gated',
          type: 'text/javascript',
          fetchpriority: 'high',
        },
      ],
    },
  },

  css: ['@unocss/reset/antfu.css', 'assets/styles/main.css'],

  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'fr',
      messages: {
        en: {
          index: {
            title: 'Welcome page',
          },
        },
        fr: {
          index: {
            title: "Page d'accueil",
          },
        },
      },
    },
  },

  content: {

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
