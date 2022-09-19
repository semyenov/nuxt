export default defineNuxtRouteMiddleware((from, to) => {
  const logger = useLogger()
  logger.log('From', from.fullPath)
  logger.log('To', to.fullPath)
})
