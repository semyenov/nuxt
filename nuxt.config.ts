import { resolve } from 'pathe'

import en from './locales/en.json'
import fr from './locales/fr.json'

// declare module '@nuxt/schema' {
//   interface PublicRuntimeConfig {
//     apiBase: string
//   }
// }

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // alias: {
  //   '@': resolve(__dirname, 'src'),
  //   '~': resolve(__dirname, 'src'),
  //   '@@': resolve(__dirname),
  //   '~~': resolve(__dirname),
  //   assets: resolve(__dirname, 'src', 'assets'),
  //   public: resolve(__dirname, 'src', 'public'),
  // },
  build: {
    transpile: ['winbox'],
  },

  telemetry: false,

  srcDir: resolve(__dirname, 'src'),
  appDir: resolve(__dirname, 'src', 'app'),

  runtimeConfig: {
    public: {
      apiUri: 'http://localhost:3000/api',
    },
  },

  typescript: {
    shim: false,
    strict: true,
    // typeCheck: true,
  },

  imports: {
    dirs: ['store', 'composables', 'utils'],
  },

  css: [
    '@unocss/reset/antfu.css',
    'assets/styles/main.postcss',
    'assets/styles/winbox.postcss',
  ],

  app: {
    head: {
      charset: 'utf-8',
      title: 'A Better Nuxt 3 Starter',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
    // pageTransition: {
    //   name: 'page',
    //   mode: 'out-in',
    // },
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
    api: {
      baseURL: '/_content',
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/emotion',
    '@vue-macros/nuxt',
    'magic-regexp/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-typed-router',

    '@/modules/test/index',
  ],

  // vite: {
  //   build: {
  //     rollupOptions: {
  //       external: (source, importer, ok) => {
  //         console.log({ source, importer, ok })
  //       },
  //     },
  //   },
  // },

  // vite: {
  //   optimizeDeps: {
  //     exclude: ['css-tree', 'winbox'],
  //   },
  //   build: {
  //     rollupOptions: {
  //       external: ['url', 'fs', 'module', 'path'],
  //     },
  //   },
  // },
})
