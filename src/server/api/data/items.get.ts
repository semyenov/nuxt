import { range } from '@antfu/utils'
import { defineEventHandler } from 'h3'

export default defineEventHandler((_event) => {
  return range(100).map((i) => ({
    _id: `${i}`,
    name: `Test ${i}`,
  }))
})
