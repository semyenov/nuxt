export default defineNuxtPlugin((_nuxtApp) => {
  const logger = useLogger()
  logger.success('Test plugin succeded')
})
