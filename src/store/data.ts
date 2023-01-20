import { defineStore } from 'pinia'
import type { IData, IDataUpdateInput } from '@/types'

export const dataStoreKey = 'data' as const

export const useDataStore = defineStore(dataStoreKey, () => {
  const backendStore = useBackendStore()

  const itemsGetter = backendStore.itemsGetter<IData>('data').then((items) =>
    computed(() =>
      items.value
        .filter((item) => {
          return parseInt(item.height) % 2 === 0
        })
        .sort((a, b) => {
          const ah = parseInt(a.height)
          const bh = parseInt(b.height)

          if (ah === bh) {
            return 0
          }

          return ah > bh ? -1 : 1
        })
        .map((item) => item._id)
    )
  )

  const itemGetter = backendStore.itemGetter<IData>('data')

  const getItems = () => backendStore.getMany<IData>(['data', 'items'])
  const getOthers = () => backendStore.getMany<IData>(['data', 'others'])

  const getItem = (id: string) =>
    backendStore.getOne<IData>(['data', 'items', id])
  const putItem = (id: string, input: IDataUpdateInput) =>
    backendStore.putOne<IData, IDataUpdateInput>(['data', 'items', id], input)

  return {
    itemsGetter,
    itemGetter,

    getItems,
    getOthers,

    getItem,
    putItem,
  }
})
