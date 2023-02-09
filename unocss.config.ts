import chroma from 'chroma-js'
import { range } from '@antfu/utils'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import {
  presetUno as createPresetUno,
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import type {
  UIColorVariants,
  UIRoundedVariants,
  UISizeVariants,
} from '@/types/ui'

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

export const uiSizeVariants: UISizeVariants[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const uiColorVariants: UIColorVariants[] = [
  'default',
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

const presetUno = createPresetUno()
const presetUnoTheme = presetUno.theme!

type UnoTheme = typeof presetUnoTheme
type UnoColors = Exclude<typeof presetUnoTheme.colors, undefined>

const shortcuts = {
  ...[...unoColorVariants, ...uiColorVariants].reduce(
    (s, c) => ({
      ...s,
      [`box-color__${c}--1`]: `
          bg-transparent
          text-${c}-600
          border-${c}-100

          dark:bg-transparent
          dark:text-${c}-600
          dark:border-${c}-800
        `,
      [`box-color__${c}--2`]: `
          bg-${c}-50
          text-${c}-650
          border-${c}-150

          dark:bg-${c}-900
          dark:text-${c}-100
          dark:border-${c}-800
        `,
      [`box-color__${c}--3`]: `
          bg-${c}-100
          text-${c}-700
          border-${c}-200

          dark:bg-${c}-850
          dark:text-${c}-50
          dark:border-${c}-750
        `,
      [`box-color__${c}--4`]: `
          bg-${c}-150
          text-${c}-750
          border-${c}-250

          dark:bg-${c}-800
          dark:text-${c}-50
          dark:border-${c}-700
        `,
      [`box-color__${c}--5`]: `
          bg-${c}-600
          text-${c}-50
          border-${c}-700

          dark:bg-${c}-500
          dark:text-${c}-800
          dark:border-${c}-700
      `,
      [`box-color__${c}--6`]: `
          bg-${c}-650
          text-${c}-50
          border-${c}-600

          dark:bg-${c}-450
          dark:text-${c}-900
          dark:border-${c}-650
        `,
      [`box-color__${c}--7`]: `
          bg-${c}-700
          text-${c}-100
          border-${c}-500

          dark:bg-${c}-400
          dark:text-${c}-900
          dark:border-${c}-700
        `,
      [`box-color__${c}--8`]: `
          bg-${c}-800
          text-${c}-100
          border-${c}-500

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-750
        `,
      [`box-color__${c}--9`]: `
          bg-${c}-900
          text-${c}-150
          border-${c}-500

          dark:text-white
          dark:bg-${c}-900
          dark:border-${c}-850
        `,
      [`list-color__${c}`]: `
          bg-white
          divide-${c}-400
          border-${c}-500

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

  'box-size__xs': 'gap-1 px-2.5 py-1 text-xs',
  'box-size__sm': 'gap-1.5 px-3 py-1.5 text-sm ',
  'box-size__md': 'gap-2 px-3.5 py-2 text-base',
  'box-size__lg': 'gap-2.5 px-4 py-2.5 text-lg ',
  'box-size__xl': 'gap-3 px-4.5 py-3',
}

function createColorScale(
  color: UnoColors | string,
  steps = 18
): UnoColors | string {
  if (!color) {
    return '#ff00ff'
  }

  if (typeof color === 'string') {
    return color
  }

  const start = color[50] as string
  const stop = color[900] as string

  return chroma
    .scale([start, stop])
    .mode('rgb')
    .colors(steps)
    .reduce(
      (s, c, i) => ({
        ...s,
        [50 * (i + 1)]: chroma(c)
          .saturate((1 / steps) * i - 0.2)
          .hex(),
      }),
      {} as UnoColors
    )
}

export default defineConfig<UnoTheme>({
  extendTheme: (theme) => {
    if (!theme.colors) {
      return
    }

    theme.colors.default = createColorScale(theme.colors.zinc)
    theme.colors.primary = createColorScale(theme.colors.emerald)
    theme.colors.secondary = createColorScale(theme.colors.sky)
    theme.colors.third = createColorScale(theme.colors.rose)
    theme.colors.fourth = createColorScale(theme.colors.yellow)

    return theme
  },
  rules: [['custom-rule', { color: 'red' }]],
  safelist: [
    ...range(12).map((i) => `gap-${i / 2}`),
    ...Object.keys(shortcuts).flatMap((c) => [
      `${c}`,
      `hover:${c}`,
      `focus:${c}`,
    ]),
  ],
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        lato: 'Lato',
      },
    }),
    presetTypography(),
    presetUno,
    presetScrollbar(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts,
})
