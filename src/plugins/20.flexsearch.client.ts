import { Document } from 'flexsearch/dist/flexsearch.bundle'

import type { IUser } from '@/types'
import { IMetaScope } from '@/types'

declare global {
  interface Window {
    UsersIndex: Document<IUser>
  }
}

export default defineNuxtPlugin(async (_nuxtApp) => {
  const backendStore = useBackendStore()

  _nuxtApp.hooks.hookOnce('app:mounted', () => {
    window.UsersIndex = new Document<IUser>({
      document: {
        id: '_id',
        field: ['info:first_name', 'info:last_name'],
      },
    })

    const users = [...backendStore.store.get(IMetaScope.USERS)!.entries()].map(
      (item) => window.UsersIndex.add(item[0], item[1])
    )

    console.log('Flexsearch', window.UsersIndex.search('Keefe'))
  })
})
