const logger = useLogger()

export default defineNuxtRouteMiddleware(async (to, from) => {
  logger.log('From', from.fullPath)
  logger.log('To', to.fullPath)
})
