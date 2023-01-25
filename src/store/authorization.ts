import { acceptHMRUpdate, defineStore } from 'pinia'

export const authorizationStoreKey = 'authorization' as const
export const useAuthorizationStore = defineStore('authorization', () => {
  const authorization = ref<string | null>(null)

  return {
    authorization,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAuthorizationStore, import.meta.hot)
  )
}
