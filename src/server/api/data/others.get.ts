import { range } from '@antfu/utils'

export default defineEventHandler((_event) => {
  return range(101, 1000).map((i) => ({
    _id: `${i}`,
    name: `Test ${i}`,
  }))
})
