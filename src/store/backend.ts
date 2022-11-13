import { acceptHMRUpdate, defineStore } from 'pinia'
import { isClient } from '@vueuse/core'

import type { FetchOptions } from 'ohmyfetch'

export type ScopeType = 'data' | 'objects'
export interface IWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const
export const backendScopeTypes: ScopeType[] = ['data', 'objects']

export const useBackendStore = defineStore('backend', () => {
  const appConfig = useAppConfig()
  const authorization = ref<string>('test')
  const baseURL = !isClient ? appConfig.apiUri : '/'

  const store = ref<Map<ScopeType, Map<string, any>>>(
    new Map(backendScopeTypes.map((scope) => [scope, new Map()]))
  )

  const itemGetter =
    <T extends IWithIdentificator>(scope: ScopeType) =>
    async (id: string) => {
      const storeScopeMap = store.value.get(scope)!
      if (!storeScopeMap.has(id)) {
        await getItem<T>([scope, 'items', id])
      }

      return computed(() => {
        return storeScopeMap.get(id)
      })
    }

  const itemsGetter = async <T extends IWithIdentificator>(
    scope: ScopeType
  ) => {
    const storeScopeMap = store.value.get(scope)!
    if (storeScopeMap.size === 0) {
      await getItems<T>([scope, 'items'])
    }

    return computed(() => {
      return Array.from(storeScopeMap.keys())
    })
  }

  async function getItem<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const res = await $fetch<T>(uri, {
      baseURL,
      headers: [['Authorization', `Bearer ${authorization.value}`]],
      method: 'get',
      ...opts,
    })

    if (res) {
      setItems(scope, [res])
      return res as T
    }
  }

  async function getItems<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, string, ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T[] | undefined> {
    const uri = formatURI(scope, command, ...params)
    const res = await $fetch<T[]>(uri, {
      baseURL,
      headers: [['Authorization', `Bearer ${authorization.value}`]],
      method: 'get',
      ...opts,
    })

    if (res && res.length > 0) {
      setItems(scope, res)
      return res as T[]
    }
  }

  function setItems<T extends IWithIdentificator>(
    scope: ScopeType,
    items: T[]
  ) {
    const storeScopeMap = store.value.get(scope)!
    for (const item of items) {
      storeScopeMap.set(item._id, item)
    }

    return true
  }

  return { store, itemGetter, itemsGetter, getItem, getItems }
})

function formatURI(...args: string[]) {
  return ['/api', ...args].filter((item) => !!item && item !== '').join('/')
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
