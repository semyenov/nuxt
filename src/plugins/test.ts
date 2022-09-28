export default defineNuxtPlugin(async (_nuxtApp) => {
  const logger = useLogger()
  logger.success('Test plugin loaded')
})
