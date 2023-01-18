import { defineStore } from 'pinia'
import type { IData, IDataUpdateInput } from '@/types'

export const dataStoreKey = 'data' as const

export const useDataStore = defineStore(dataStoreKey, () => {
  const backendStore = useBackendStore()

  const itemsGetter = backendStore.itemsGetter<IData>('data')
  const itemGetter = backendStore.itemGetter<IData>('data')

  const getItems = backendStore.getItems<IData>(['data', 'items'])
  const getOthers = backendStore.getItems<IData>(['data', 'others'])

  const getItem = (id: string) =>
    backendStore.getItem<IData>(['data', 'items', id])
  const putItem = (id: string, input: IDataUpdateInput) =>
    backendStore.putItem<IData, IDataUpdateInput>(['data', 'items', id], input)

  return {
    itemsGetter,
    itemGetter,

    getItems,
    getOthers,

    getItem,
    putItem,
  }
})
