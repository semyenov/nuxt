import { defineEventHandler } from 'h3'

export default defineEventHandler((_event) => {
  return [
    {
      _id: '1',
      name: 'Test 1',
    },
    {
      _id: '2',
      name: 'Test 2',
    },
    {
      _id: '3',
      name: 'Test 3',
    },
  ]
})
