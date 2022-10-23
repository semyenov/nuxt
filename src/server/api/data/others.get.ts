import { items } from '../../data'

export default defineEventHandler((_event) => {
  return items.slice(5)
})
