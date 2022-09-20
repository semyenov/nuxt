export default defineNuxtRouteMiddleware((to, from) => {
  const logger = useLogger()
  logger.log('From', from.fullPath)
  logger.log('To', to.fullPath)
})
