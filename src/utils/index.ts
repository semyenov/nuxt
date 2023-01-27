export * from './virtual'

export function castArray<T>(arr: T | T[]) {
  return Array.isArray(arr) ? arr : [arr]
}
