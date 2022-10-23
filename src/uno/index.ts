// const colors =
//   uno.theme && uno.theme.colors ? Object.keys(uno.theme.colors) : []

export type UnoSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type UnoColor =
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

export const unoColors: UnoColor[] = [
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

export const unoSizes: UnoSize[] = ['xs', 'sm', 'base', 'lg', 'xl']

const btn = {
  bg: 50,
  text: 600,
  border: 300,
  shadow: 200,
  'hover:text': 700,
  'hover:bg': 100,
  'hover:border': 400,
  'hover:shadow': 100,
  'dark:bg': 900,
  'dark:text': 200,
  'dark:border': 700,
  'dark:shadow': 800,
  'dark:hover:text': 100,
  'dark:hover:bg': 800,
  'dark:hover:border': 600,
  'dark:hover:shadow': 900,
}

export const createShortcuts = () =>
  unoColors.reduce(
    (p, c) => ({
      ...p,
      [`btn-${c}`]: Object.entries(btn)
        .map(([s, n]) => `${s}-${c}-${n}`)
        .join(' '),
    }),
    {
      btn: 'flex flex-row items-center justify-center border rounded-md transition-200',
      'btn-xs': 'gap-1 px-2 py-1 text-xs shadow',
      'btn-sm': 'gap-1.5 px-2.5 py-1.5 text-sm shadow-md',
      'btn-base': 'gap-2 px-3 py-2 text-base shadow-lg',
      'btn-lg':
        'gap-2.5 px-3.5 py-2.5 text-lg shadow-xl dark:shadow-opacity-50',
      'btn-xl': 'gap-3 px-4 py-3 text-xl shadow-2xl',
    }
  )
