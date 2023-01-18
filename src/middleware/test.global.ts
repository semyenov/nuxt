const logger = useLogger()

export default defineNuxtRouteMiddleware(async (to, from) => {
  logger.success(`Test global middleware ${from.fullPath} -> ${to.fullPath}`)
})
