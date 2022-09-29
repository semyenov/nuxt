import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetUno(),
  ],
  shortcuts: {
    'test-shortcut':
      'text-2xl font-bold cursor-pointer text-#41B883 hover:text-teal',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
