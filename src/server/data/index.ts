import { range } from '@antfu/utils'

export const items = range(0, 100000).map((i) => ({
  _id: `${i}`,
  name: `Test ${i}`,
  height: `${Math.floor(Math.random() * 80) + 40}px`,
}))
