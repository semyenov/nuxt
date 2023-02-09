import { range } from '@antfu/utils'
import chroma from 'chroma-js'
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
import { presetScrollbar } from 'unocss-preset-scrollbar'

import { createShortcuts } from './uno'

const shortcuts = createShortcuts()
const presetUno = createPresetUno()
const presetUnoTheme = presetUno.theme!

function createColorScale(
  color: typeof presetUnoTheme.colors,
  steps: number = 18
) {
  if (color) {
    return chroma
      .scale([color[50], color[900]])
      .mode('rgb')
      .colors(steps)
      .reduce(
        (s, c, i) => ({
          ...s,
          [50 * (i + 1)]: chroma(c)
            .saturate((1 / steps) * i - 0.2)
            .hex(),
        }),
        {} as typeof presetUnoTheme.colors
      )
  }
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
