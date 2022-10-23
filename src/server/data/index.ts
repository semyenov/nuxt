import { range } from '@antfu/utils'

export const items = range(0, 10000).map((i) => ({
  _id: `${i}`,
  name: `Test ${i}`,
  height: `${Math.floor(Math.random() * 80) + 20}px`,
}))
