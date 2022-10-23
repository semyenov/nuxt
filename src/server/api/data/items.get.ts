import { defineEventHandler } from 'h3'
import { items } from '../../data'

export default defineEventHandler((_event) => {
  return items.slice(0, 5)
})
