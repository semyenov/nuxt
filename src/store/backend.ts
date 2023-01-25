import { acceptHMRUpdate, defineStore } from 'pinia'
import { toArray } from '@antfu/utils'

import type { FetchOptions } from 'ofetch'
import { BackendClient } from '@/api/client'

export type ScopeType = 'data' | 'objects' | 'users'
export interface IWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const
export const backendLogger = useLogger(backendStoreKey)

export const backendScopeTypes: ScopeType[] = ['data', 'objects']
export const backendScopeTypesMap: Record<ScopeType, ScopeType[]> = {
  data: ['data'],
  objects: ['objects'],
  users: ['users'],
}

export const useBackendStore = defineStore(backendStoreKey, () => {
  const appConfig = useAppConfig()
  const baseURL = appConfig.apiUri

  const authorizationStore = useAuthorizationStore()

  const client = new BackendClient({
    baseURL,
    onRequestError: (ctx) => {
      backendLogger.error(JSON.stringify(ctx, null, 2))
    },
  })

  const store = ref<Map<ScopeType, Map<string, any>>>(
    new Map(backendScopeTypes.map((scope) => [scope, new Map()]))
  )

  const itemsGetter = async <T extends IWithIdentificator>(
    scope: ScopeType
  ) => {
    const storeScopeMap = store.value.get(scope)!
    if (storeScopeMap.size === 0) {
      await get<T[]>([scope, 'items'])
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
        await get<T>([scope, 'items', id])
      }

      return computed(() => {
        return storeScopeMap.get(id) as T | undefined
      })
    }

  async function get<T extends Record<string, any>>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorizationStore.authorization)

    const res = await client.request<T>('get', uri, {
      baseURL,
      headers,
      ...opts,
    })

    if (res.data && res.data.length > 0) {
      setStoreItems(scope, '_id', toArray<T>(res.data))
      return res.data
    }
  }

  async function put<T, B extends Record<string, any>>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    body: B,
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorizationStore.authorization)

    const res = await client.request<T>('put', uri, {
      baseURL,
      headers,
      body,
      ...opts,
    })

    if (res.data) {
      // setStoreItems(scope, [res.data])
      return res.data
    }
  }

  async function post<T, B extends Record<string, any>>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    body: B,
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const headers = formatHeaders(authorizationStore.authorization)

    const res = await client.request<T>('post', uri, {
      baseURL,
      headers,
      body,
      ...opts,
    })

    if (res.data) {
      // setStoreItems(scope, [res.data])
      return res.data
    }
  }

  function setStoreItems<T extends Record<string, any>, K extends keyof T>(
    scope: ScopeType,
    key: K,
    items: T[]
  ) {
    const storeScopeMap = store.value.get(scope)!
    for (const item of items) {
      storeScopeMap.set(item[key], item)
    }

    return true
  }

  return {
    store,

    itemsGetter,
    itemGetter,

    get,
    post,
    put,
  }
})

function formatHeaders(authorization: string | null): HeadersInit {
  const headers: HeadersInit = []

  if (authorization) {
    headers.push(['Authorization', `Bearer ${authorization}`])
  }

  return headers
}

function formatURI(scope: ScopeType, ...args: string[]) {
  return [...backendScopeTypesMap[scope], ...args]
    .filter((item) => !!item && item !== '')
    .join('/')
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
