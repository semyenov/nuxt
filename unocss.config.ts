import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { createShortcuts } from './src/uno'
const shortcuts = createShortcuts()

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  safelist: Object.keys(shortcuts).concat([
    'gap-1',
    'gap-1.5',
    'gap-2',
    'gap-2.5',
    'gap-3',
    'gap-3.5',
    'gap-4',
    'gap-4.5',
    'gap-5',
    'gap-5.5',
    'gap-6',
    'gap-6.5',
  ]),

  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetUno(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts,
})
