import { range } from '@antfu/utils'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

import { createShortcuts } from './uno'
const shortcuts = createShortcuts()

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  safelist: Object.keys(shortcuts).concat(range(12).map((i) => `gap-${i / 2}`)),
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
    presetUno(),
    presetScrollbar(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts,
})
