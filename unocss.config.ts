import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const uno = presetUno()
// const colors =
//   uno.theme && uno.theme.colors ? Object.keys(uno.theme.colors) : []

const colors = [
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

const btn = {
  bg: 50,
  text: 500,
  border: 300,
  shadow: 200,
  'hover:text': 600,
  'hover:bg': 100,
  'hover:border': 400,
  'hover:shadow': 100,
  'dark:bg': 900,
  'dark:text': 300,
  'dark:border': 700,
  'dark:shadow': 800,
  'dark:hover:text': 200,
  'dark:hover:bg': 800,
  'dark:hover:border': 600,
  'dark:hover:shadow': 900,
}

const shortcuts = {
  ...colors.reduce(
    (p, c) => ({
      ...p,
      [`btn-${c}`]: Object.entries(btn)
        .map(([s, n]) => `${s}-${c}-${n}`)
        .join(' '),
    }),
    {}
  ),
  btn: 'flex flex-row items-center justify-center border rounded transition-200 shadow',
  'btn-xs': 'gap-1 px-2 py-1 text-xs shadow-xs',
  'btn-sm': 'gap-1.5 px-2.5 py-1.5 text-sm shadow-sm',
  'btn-base': 'gap-2 px-3 py-2 text-base shadow',
  'btn-lg': 'gap-2.5 px-3.5 py-2.5 text-lg shadow-lg',
  'btn-xl': 'gap-3 px-4 py-3 text-xl shadow-xl',
}

// console.log(shortcuts)

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  safelist: [
    ...Object.keys(shortcuts),
    'gap-1',
    'gap-2',
    'gap-3',
    'gap-4',
    'gap-5',
    'gap-6',
  ],
  presets: [presetAttributify(), presetIcons(), presetTypography(), uno],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts,
})
