export type UnoColorVariants =
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'red'
  | 'gray'
  | 'slate'
  | 'zinc'
  | 'neutral'
  | 'stone'

export const unoColorVariants: UnoColorVariants[] = [
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'violet',
  'indigo',
  'blue',
  'sky',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'red',
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
]

export type UISizeVariants = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type UIColorVariants = 'primary' | 'secondary' | 'third' | 'fourth'
export type UIRoundedVariants =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'

export const uiSizeVariants: UISizeVariants[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const uiColorVariants: UIColorVariants[] = [
  'primary',
  'secondary',
  'third',
  'fourth',
]
export const uiRoundedVariants: UIRoundedVariants[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
]

export function createShortcuts() {
  return {
    ...[...unoColorVariants, ...uiColorVariants].reduce(
      (s, c) => ({
        ...s,
        [`box-color__${c}--1`]: `
          bg-transparent
          text-${c}-600
          border-${c}-200

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`box-color__${c}--2`]: `
          bg-${c}-50
          text-${c}-600
          border-${c}-200

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`box-color__${c}--3`]: `
          bg-${c}-100
          text-${c}-700
          border-${c}-300

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`box-color__${c}--4`]: `
          bg-${c}-200
          text-${c}-800
          border-${c}-400

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`box-color__${c}--5`]: `
          bg-${c}-600
          text-${c}-50
          border-${c}-300

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
      `,
        [`box-color__${c}--6`]: `
          bg-${c}-700
          text-white
          border-${c}-600

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`box-color__${c}--7`]: `
          bg-${c}-800
          text-white
          border-${c}-500

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-400
        `,
        [`box-color__${c}--8`]: `
          bg-${c}-900
          text-white
          border-${c}-500

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-500
        `,
        [`list-color__${c}`]: `
          bg-white
          divide-${c}-400
          border-${c}-500
          shadow-${c}-400

          dark:divide-${c}-700
          dark:border-${c}-600
          dark:bg-gray-900
        `,
      }),
      {} as Record<string, string>
    ),

    'box-rounded__xs': 'rounded-sm',
    'box-rounded__sm': 'rounded',
    'box-rounded__md': 'rounded-md',
    'box-rounded__lg': 'rounded-lg',
    'box-rounded__xl': 'rounded-xl',
    'box-rounded__full': 'rounded-full',

    'box-size__xs': 'gap-1 px-2 py-1 text-xs',
    'box-size__sm': 'gap-1.5 px-2.5 py-1.5 text-sm ',
    'box-size__md': 'gap-2 px-3 py-2 text-base',
    'box-size__lg': 'gap-2.5 px-3.5 py-2.5 text-lg ',
    'box-size__xl': 'gap-3 px-4 py-3',
  }
}
