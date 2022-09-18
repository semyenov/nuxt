import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  rules: [['custom-rule', { color: 'red' }]],
  shortcuts: {
    'custom-shortcut': 'text-2xl font-bold text-#41B883 hover:text-teal',
  },
})
