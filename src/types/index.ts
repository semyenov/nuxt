import z from 'zod'

export const IDataScheme = z.object({
  _id: z.string(),
  name: z.string(),
  height: z.string(),
})
export type IData = z.infer<typeof IDataScheme>

export const IDataUpdateInputScheme = z.object({
  height: z.string(),
})
export type IDataUpdateInput = z.infer<typeof IDataUpdateInputScheme>
