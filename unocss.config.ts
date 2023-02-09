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

import { createShortcuts } from './uno'

type UnoColors = Exclude<typeof presetUnoTheme.colors, undefined>

const shortcuts = createShortcuts()
const presetUno = createPresetUno()
const presetUnoTheme = presetUno.theme!

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
      {}
    )
}

export default defineConfig<typeof presetUnoTheme>({
  extendTheme: (theme) => {
    if (!theme.colors) {
      return
    }

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
