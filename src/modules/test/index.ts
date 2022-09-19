import { resolve } from 'pathe'
import { defineNuxtModule, extendPages, useLogger } from '@nuxt/kit'

const logger = useLogger('modules/test')

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.hooks.hookOnce('nitro:config', (config) => {
      logger.info('Nitro config')
      logger.log(config)
    })

    logger.success('Test module succeded')

    extendPages((pages) => {
      // Add /test page
      logger.info('Add test page', resolve(__dirname, 'pages/test.vue'))
      pages.push({
        name: 'Test',
        path: '/test',
        file: resolve(__dirname, 'pages/test.vue'),
      })
    })
  },
})
