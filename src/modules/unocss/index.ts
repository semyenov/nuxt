import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import VitePlugin from '@unocss/vite'
import { loadConfig } from '@unocss/config'
import type { UserConfig } from '@unocss/core'
import { resolveOptions } from './options'
import type { UnocssNuxtOptions } from './types'

export { UnocssNuxtOptions }

export default defineNuxtModule<UnocssNuxtOptions>({
  meta: {
    name: 'unocss',
    configKey: 'unocss',
  },
  defaults: {
    preflight: false,
    components: true,

    // presets
    uno: true,
    attributify: false,
    webFonts: false,
    icons: false,
    wind: false,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // preset shortcuts
    resolveOptions(options)

    if (options.components) {
      addComponentsDir({
        path: resolve('components'),
        watch: false,
      })
    }

    const { config: unoConfig } = await loadConfig<UserConfig>(
      process.cwd(),
      { configFile: options.configFile },
      [],
      options
    )

    if (
      nuxt.options.builder === '@nuxt/vite-builder' &&
      nuxt.options.postcss.plugins.cssnano &&
      unoConfig.transformers?.some(
        (t) =>
          t.name === '@unocss/transformer-directives' && t.enforce !== 'pre'
      )
    ) {
      const preset = nuxt.options.postcss.plugins.cssnano.preset
      nuxt.options.postcss.plugins.cssnano = {
        preset: [
          preset?.[0] || 'default',
          Object.assign(preset?.[1] || {}, {
            mergeRules: false,
            normalizeWhitespace: false,
            discardComments: false,
          }),
        ],
      }
    }

    nuxt.hook('vite:extend', ({ config }) => {
      config.plugins = config.plugins || []
      config.plugins.unshift(...VitePlugin({}, unoConfig))
    })

    // extendWebpackConfig((config) => {
    //   config.plugins = config.plugins || []
    //   config.plugins.unshift(WebpackPlugin({}, unoConfig))
    // })

    if (nuxt.options.dev) {
      // @ts-expect-error missing type
      nuxt.hook('devtools:customTabs', (tabs) => {
        tabs.push({
          title: 'UnoCSS',
          name: 'unocss',
          icon: '/__unocss/favicon.svg',
          view: {
            type: 'iframe',
            src: '/__unocss/',
          },
        })
      })
    }
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    unocss?: UnocssNuxtOptions
  }
  interface NuxtOptions {
    unocss?: UnocssNuxtOptions
  }
}
