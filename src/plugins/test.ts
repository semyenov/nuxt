export default defineNuxtPlugin((nuxtApp) => {
  const logger = useLogger()
  logger.info('Test', nuxtApp.globalName)
})
