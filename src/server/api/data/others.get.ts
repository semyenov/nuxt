import { range } from '@antfu/utils'

export default defineEventHandler((_event) => {
  return range(100, 100000).map((i) => ({
    _id: `${i}`,
    name: `Test ${i}`,
    height: `${Math.floor(Math.random() * 80) + 20}px`,
  }))
})
