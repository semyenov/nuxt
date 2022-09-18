import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetTypography,
} from 'unocss'

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  presets: [
    presetAttributify(),
    presetIcons(),
    presetUno(),
    presetTypography(),
  ],
  shortcuts: {
    'custom-shortcut':
      'text-2xl font-bold cursor-pointer text-#41B883 hover:text-teal',
  },
})
