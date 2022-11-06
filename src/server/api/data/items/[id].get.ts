import { defineEventHandler } from 'h3'
import { items } from '@/server/data'

export default defineEventHandler((event) => {
  const id = event.context.params.id
  return items.find((item) => item._id === id)
})
