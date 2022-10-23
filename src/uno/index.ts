// const colors =
//   uno.theme && uno.theme.colors ? Object.keys(uno.theme.colors) : []

export type UnoSizeVariants = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type UnoRoundedVariants =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
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

export const unoSizeVariants: UnoSizeVariants[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const unoRoundedVariants: UnoRoundedVariants[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
]

const btn = {
  bg: 50,
  text: 600,
  border: 400,
  shadow: 200,
  'hover:text': 700,
  'hover:bg': 100,
  'hover:border': 500,
  'hover:shadow': 100,
  'dark:bg': 900,
  'dark:text': 200,
  'dark:border': 600,
  'dark:shadow': 800,
  'dark:hover:text': 100,
  'dark:hover:bg': 800,
  'dark:hover:border': 500,
  'dark:hover:shadow': 900,
}

export const createShortcuts = () => {
  const buttons = unoColorVariants.reduce(
    (p, c) => ({
      ...p,
      [`btn-color__${c}`]: Object.entries(btn)
        .map(([s, n]) => `${s}-${c}-${n}`)
        .join(' '),
    }),
    {
      btn: 'flex flex-row items-center justify-center border rounded-md transition-200',
      'btn-size__xs': 'gap-1 px-2 py-1 text-xs shadow',
      'btn-size__sm': 'gap-1.5 px-2.5 py-1.5 text-sm shadow-md',
      'btn-size__md':
        'gap-2 px-3 py-2 text-base shadow-lg dark:shadow-opacity-70',
      'btn-size__lg':
        'gap-2.5 px-3.5 py-2.5 text-lg shadow-xl dark:shadow-opacity-50',
      'btn-size__xl': 'gap-3 px-4 py-3 text-xl shadow-2xl',
      'btn-rounded__none': 'rounded-none',
      'btn-rounded__xs': 'rounded-sm',
      'btn-rounded__sm': 'rounded',
      'btn-rounded__md': 'rounded-md',
      'btn-rounded__lg': 'rounded-lg',
      'btn-rounded__xl': 'rounded-xl',
      'btn-rounded__full': 'rounded-full',
    }
  ) as Record<string, string>

  const inputs = unoColorVariants.reduce(
    (p, c) => {
      const bc = buttons[`btn-color__${c}`]
      const bcg = buttons[`btn-color__gray`]

      return {
        ...p,
        [`input-color__${c}`]: [
          bcg,
          ...bc.split(' ').map((i) => `focus:${i}`),
        ].join(' '),
      }
    },
    {
      input:
        'flex flex-row items-center justify-center border rounded-md transition-200 outline-none',
      'input-size__xs': ' px-3 py-1 text-xs shadow',
      'input-size__sm': 'px-3.5 py-1.5 text-sm shadow-md',
      'input-size__md': 'px-4 py-2 text-base shadow-lg dark:shadow-opacity-70',
      'input-size__lg':
        'px-4.5 py-2.5 text-lg shadow-xl dark:shadow-opacity-50',
      'input-size__xl': 'px-5 py-3 text-xl shadow-2xl',
      'input-rounded__none': 'rounded-none',
      'input-rounded__xs': 'rounded-sm',
      'input-rounded__sm': 'rounded',
      'input-rounded__md': 'rounded-md',
      'input-rounded__lg': 'rounded-lg',
      'input-rounded__xl': 'rounded-xl',
      'input-rounded__full': 'rounded-full',
    }
  )

  return { ...buttons, ...inputs }
}
