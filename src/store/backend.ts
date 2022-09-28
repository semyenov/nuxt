import type { UseFetchOptions } from '#app'
import type { NitroFetchRequest } from 'nitropack'
import { acceptHMRUpdate, defineStore } from 'pinia'

type FetchFunctionType = 'data' | 'objects'
interface ObjectWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const
export const useBackendStore = defineStore('backend', () => {
  const store = ref<Map<string, Map<string, unknown>>>(new Map())
  const authorization = ref<string>('')

  const setItems = <T extends ObjectWithIdentificator>(
    type: string,
    items: T[]
  ) => {
    if (!store.value.has(type)) {
      store.value.set(type, new Map(items.map((item) => [item._id, item])))

      return items
    }

    const storeItems = store.value.get(type) as Map<string, T>
    for (const item of items) {
      storeItems.set(item._id, item)
    }

    return storeItems
  }

  const getItems = async <T extends ObjectWithIdentificator>(
    request: NitroFetchRequest,
    opts?: UseFetchOptions<T[]>
  ) => {
    const [type, ...command] = getUrl(request.toString())
    const res = await useFetch<T[]>(request, {
      key: `${type}-${command.join('.')}`,
      method: 'get',
      // baseURL: 'http://localhost:3000',
      headers: new Headers([
        ['authorization', `bearer ${authorization.value}`],
      ]),
      ...opts,
    })

    if (res.data && res.data.value) {
      setItems(type, res.data.value)
    }

    return res
  }

  return { store, getItems }
})

function getUrl(str: string) {
  return str
    .split('/')
    .filter((item) => item !== '')
    .slice(1) as [FetchFunctionType, ...string[]]
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
