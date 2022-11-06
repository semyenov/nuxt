import { defineEventHandler } from 'h3'
import { items } from '@/server/data'

export default defineEventHandler((_event) => {
  return items.slice(0, 10000)
})
