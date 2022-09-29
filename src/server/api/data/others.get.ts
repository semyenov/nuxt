import { range } from '@antfu/utils'

export default defineEventHandler((_event) => {
  return range(100, 1000).map((i) => ({
    _id: `${i}`,
    name: `Test ${i}`,
  }))
})
