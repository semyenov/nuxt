import type { FetchOptions } from 'ohmyfetch'

import { acceptHMRUpdate, defineStore } from 'pinia'

export type ScopeType = 'data' | 'objects'
export interface IWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const
export const useBackendStore = defineStore('backend', () => {
  // const appConfig = useAppConfig()

  const store = ref<Map<string, Map<string, any>>>(new Map())
  const authorization = ref<string>('test')

  const itemGetter =
    <T extends IWithIdentificator>(scope: ScopeType) =>
    (id: string) =>
      asyncComputed(async () => {
        if (store.value.has(scope)) {
          const storeItemsMap = store.value.get(scope) as Map<string, T>
          if (storeItemsMap.has(id)) {
            return storeItemsMap.get(id)
          }
        }

        const item = await getItem<T>([scope, 'items', id])
        return item
      })

  const itemsGetter = <T extends IWithIdentificator>(scope: ScopeType) =>
    asyncComputed<string[]>(async () => {
      if (store.value.has(scope)) {
        const storeItemsMap = store.value.get(scope)
        return Array.from(storeItemsMap!.keys())
      }

      const items = await getItems<T>([scope, 'items'])
      return items ? items.map((item) => item._id) : []
    })

  function setItems<T extends IWithIdentificator>(scope: string, items: T[]) {
    if (!store.value.has(scope)) {
      store.value.set(scope, new Map(items.map((item) => [item._id, item])))

      return true
    }

    const storeItemsMap = store.value.get(scope) as Map<string, T>
    for (const item of items) {
      storeItemsMap.set(item._id, item)
    }

    return true
  }

  async function getItems<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, 'items', ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T[] | undefined> {
    const uri = formatURI(scope, command, ...params)
    const res = await $fetch<T[]>(uri, {
      baseURL: `/`,
      headers: [['Authorization', `Bearer ${authorization.value}`]],
      method: 'get',
      ...opts,
    })

    if (res && res.length > 0) {
      setItems(scope, res)
      return res as T[]
    }
  }

  async function getItem<T extends IWithIdentificator>(
    [scope, command, ...params]: [ScopeType, 'items', ...string[]],
    opts?: FetchOptions<'json'>
  ): Promise<T | undefined> {
    const uri = formatURI(scope, command, ...params)
    const res = await $fetch<T>(uri, {
      baseURL: `/`,
      headers: [['Authorization', `Bearer ${authorization.value}`]],
      method: 'get',
      ...opts,
    })

    if (res) {
      setItems(scope, [res])
      return res as T
    }
  }

  return { getItems, getItem, store, itemsGetter, itemGetter }
})

function formatURI(...args: string[]) {
  return ['/api', ...args].filter((item) => !!item && item !== '').join('/')
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
