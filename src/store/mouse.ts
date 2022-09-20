import { acceptHMRUpdate, defineStore } from 'pinia'

export const mouseStoreKey = 'mouse' as const
export const useMouseStore = defineStore('mouse', () => {
  const { x, y } = useMouse()

  return {
    x,
    y,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMouseStore, import.meta.hot))
}
