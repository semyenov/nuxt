import { defineEventHandler } from 'h3'
import { items } from '../../data'

export default defineEventHandler((event) => {
  const { id } = getQuery(event)
  return items.find((item) => item._id === id)
})
