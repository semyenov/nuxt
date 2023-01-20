import { acceptHMRUpdate, defineStore } from 'pinia'
import { isClient } from '@vueuse/core'

import type { FetchOptions } from 'ohmyfetch'

export type ScopeType = 'data' | 'objects'
export interface IWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const

export const backendScopeTypes: ScopeType[] = ['data', 'objects']
export const backendScopeTypesMap: Record<ScopeType, ScopeType[]> = {
  data: ['data'],
  objects: ['objects'],
}

export const useBackendStore = defineStore(backendStoreKey, () => {
  const appConfig = useAppConfig()
  const baseURL = !isClient ? appConfig.apiUri : '/'

  const authorizationStore = useAuthorizationStore()
  const authorization = authorizationStore.authorization

  const store = ref<Map<ScopeType, Map<string, any>>>(
    new Map(backendScopeTypes.map((scope) => [scope, new Map()]))
  )

  const itemsGetter = async <T extends IWithIdentificator>(
    scope: ScopeType
  ) => {
    const storeScopeMap = store.value.get(scope)!
    if (storeScopeMap.size === 0) {
      await getMany<T>([scope, 'items'])
    }

    return computed(() => {
      return Array.from(storeScopeMap.values()) as T[]
    })
  }

  const itemGetter =
    <T extends IWithIdentificator>(scope: ScopeType) =>
    async (id: string) => {
      const storeScopeMap = store.value.get(scope)!
      if (!storeScopeMap.has(id)) {
        await getOne<T>([scope, 'items', id])
      }

      return computed(() => {
        return storeScopeMap.get(id) as T | undefined
      })
    }

  async function getMany<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T[] | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorization)

    const res = await $fetch<T[]>(uri, {
      baseURL,
      headers,
      method: 'get',
      ...opts,
    })

    if (res && res.length > 0) {
      setStoreItems(scope, res)
      return res as T[]
    }
  }

  async function getOne<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorization)

    const res = await $fetch<T>(uri, {
      baseURL,
      headers,
      method: 'get',
      ...opts,
    })

    if (res) {
      setStoreItems(scope, [res])
      return res as T
    }
  }

  async function putOne<
    T extends IWithIdentificator,
    I extends Record<string, any>
  >(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    input: I,
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorization)

    const res = await $fetch<T>(uri, {
      baseURL,
      headers,
      method: 'put',
      body: input,
      ...opts,
    })

    if (res) {
      setStoreItems(scope, [res])
      return res as T
    }
  }

  function setStoreItems<T extends IWithIdentificator>(
    scope: ScopeType,
    items: T[]
  ) {
    const storeScopeMap = store.value.get(scope)!
    for (const item of items) {
      storeScopeMap.set(item._id, item)
    }

    return true
  }

  return {
    store,

    itemsGetter,
    itemGetter,

    getMany,
    getOne,
    putOne,
  }
})

function formatHeaders(authorization: string): HeadersInit {
  return [['Authorization', `Bearer ${authorization}`]]
}

function formatURI(scope: ScopeType, ...args: string[]) {
  return ['/api', ...backendScopeTypesMap[scope], ...args]
    .filter((item) => !!item && item !== '')
    .join('/')
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
