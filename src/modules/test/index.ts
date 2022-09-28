import { createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'

const logger = useLogger('modules/test')

export default defineNuxtModule({
  setup(_options, nuxt) {
    logger.success('Test module loaded')

    const { resolve } = createResolver(import.meta.url)

    nuxt.hooks.hookOnce('nitro:config', (config) => {
      logger.info('Nitro preset', config.preset)
    })

    nuxt.hooks.hookOnce('pages:extend', (pages) => {
      logger.info('Add test page', resolve(__dirname, 'pages/test.vue'))

      pages.push({
        name: 'Test',
        path: '/test',
        file: resolve('pages', 'test.vue'),
      })
    })
  },
})
