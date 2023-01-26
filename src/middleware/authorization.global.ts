import type { IUserLoginInput, IUserTokensData } from '@/types'

const logger = useLogger()

export default defineNuxtRouteMiddleware(async (to, from) => {
  logger.success(`Test global middleware ${from.fullPath} -> ${to.fullPath}`)

  const backendStore = useBackendStore()
  const authorizationStore = useAuthorizationStore()

  const userTokenData = await backendStore.post<
    IUserTokensData,
    IUserLoginInput
  >(['users', 'current'], {
    email: 'dez@hotmail.com',
    password: '12345678',
  })

  if (userTokenData) {
    authorizationStore.authorization = userTokenData.access_token || null
  }
})
