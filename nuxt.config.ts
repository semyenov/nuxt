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
  // build: {
  //   transpile: ['winbox', 'flexsearch'],
  // },

  telemetry: false,

  srcDir: resolve(__dirname, 'src'),
  appDir: resolve(__dirname, 'src', 'app'),

  runtimeConfig: {
    public: {
      apiUri: '/api',
    },
  },

  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      // compilerOptions: {
      //   types: ['@nuxtjs/i18n', '@typed-router'],
      // },
      // vueCompilerOptions: {
      //   target: 3, // or 2.7 for Vue 2
      //   plugins: [
      //     '@vue-macros/volar/define-model',
      //     // ...more feature
      //   ],
      //   defineModel: {
      //     // Only works when target is 2.7.
      //     unified: true,
      //   },
      // },
    },
  },

  imports: {
    dirs: ['store', 'composables', 'utils', '@typed-router'],
    addons: { vueTemplate: true },
    collectMeta: true,
  },

  postcss: {
    plugins: {
      'postcss-current-selector': {},
      'postcss-nested': {},
      'postcss-nested-ancestors': {},
    },
  },

  css: [
    'uno.css',
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

  components: [
    '@/components',
    {
      island: true,
      path: '@/containers',
      extendComponent(component) {
        const name = component.kebabName

        component.mode = 'client'
        component.kebabName = `Teleport${name}`
        return component
      },
    },
  ],

  modules: [
    '@nuxtjs/emotion',
    '@vue-macros/nuxt',
    'magic-regexp/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',

    '@/modules/test/index',
    '@/modules/unocss/index',

    'nuxt-typed-router',
    '@nuxt/devtools',
  ],

  content: {
    // https://content.nuxtjs.org/api/configuration
    api: {
      baseURL: '/_content',
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en,
        fr,
      },
    },
  },

  nuxtTypedRouter: {
    plugin: true,
    experimentalPathCheck: true,
    strict: {
      NuxtLink: {
        strictRouteLocation: true,
        strictToArgument: true,
      },
      router: {
        strictRouteLocation: true,
        strictToArgument: true,
      },
    },
  },

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
