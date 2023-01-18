import { range } from '@antfu/utils'

import type { IData } from '@/types'

export const items: IData[] = range(0, 100000).map((i) => ({
  _id: `${i}`,
  name: `Test ${i}`,
  height: `${Math.floor(Math.random() * 80) + 40}px`,
}))
