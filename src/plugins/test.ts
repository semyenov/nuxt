export default defineNuxtPlugin(({ payload }) => {
  const logger = useLogger()
  logger.info('Test', payload.pinia)
})
