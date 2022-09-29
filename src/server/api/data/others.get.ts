import { range } from '@antfu/utils'

export default defineEventHandler((_event) => {
  return range(5, 100000).map((i) => ({
    _id: `${i}`,
    name: `Test ${i}`,
  }))
})
