import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IObject, IObjectUpdateInput } from '@/types'

export const objectsStoreKey = 'objects' as const

export const useObjectsStore = defineStore(objectsStoreKey, () => {
  const backendStore = useBackendStore()

  const itemsGetter = backendStore
    .itemsGetter<IObject>('objects')
    .then((items) =>
      computed(() =>
        items.value
          .filter((item) => {
            return !!item.info.name
          })
          .sort((a, b) => {
            const ah = a.info.name.trimStart()
            const bh = b.info.name.trimStart()

            if (ah === bh) {
              return 0
            }

            return ah > bh ? 1 : -1
          })
          .map((item) => item._id)
      )
    )

  const itemGetter = backendStore.itemGetter<IObject>('objects')

  const getItems = () => backendStore.get<IObject>(['objects', 'items'])
  const getOthers = () => backendStore.get<IObject>(['objects', 'others'])

  const getItem = (id: string) =>
    backendStore.get<IObject>(['objects', 'items', id])
  const putItem = (id: string, input: IObjectUpdateInput) =>
    backendStore.put<IObject, IObjectUpdateInput>(
      ['objects', 'items', id],
      input
    )

  return {
    itemsGetter,
    itemGetter,

    getItems,
    getOthers,

    getItem,
    putItem,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useObjectsStore, import.meta.hot))
}
