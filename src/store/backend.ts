import type { UseFetchOptions } from '#app'
import type { NitroFetchRequest } from 'nitropack'
import { acceptHMRUpdate, defineStore } from 'pinia'

type ScopeType = 'data' | 'objects'
interface IWithIdentificator {
  _id: string
}

export const backendStoreKey = 'backend' as const
export const useBackendStore = defineStore('backend', () => {
  const appConfig = useAppConfig()

  const store = ref<Map<string, Map<string, unknown>>>(new Map())
  const authorization = ref<string>('test')

  const itemGetter =
    <T extends IWithIdentificator>(scope: ScopeType) =>
    (id: string) =>
      computed(() => {
        const storeItemsMap = store.value.get(scope) as Map<string, T>
        return storeItemsMap.has(id) ? storeItemsMap.get(id) : undefined
      })

  const itemsGetter = (scope: ScopeType) =>
    computed(() => {
      const res: string[] = []
      const entries = store.value.get(scope).entries()

      for (const entry of entries) {
        res.push(entry[0])
      }

      return res
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
    request: NitroFetchRequest,
    opts?: UseFetchOptions<T[]>
  ): Promise<ReturnType<typeof useFetch<T[]>>> {
    const [scope, ...command] = request
      .toString()
      .split('/')
      .filter((item) => item !== '')
      .slice(1) as [ScopeType, ...string[]]

    const res = await useFetch<T[]>(request, {
      key: `${scope}-${command.join('.')}`,
      baseURL: appConfig.apiUri,
      headers: [['Authorization', `Bearer ${authorization.value}`]],
      method: 'get',
      ...opts,
    })

    if (res.data.value) {
      setItems(scope, res.data.value)
    }

    return res
  }

  return { getItems, store, itemsGetter, itemGetter }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBackendStore, import.meta.hot))
}
