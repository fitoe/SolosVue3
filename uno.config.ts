import { defineConfig, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      cdn: 'https://esm.sh/',
      scale: 1.1,
    }),
  ],
  shortcuts: {
    'app-panel': 'border border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-surface)] shadow-xl shadow-slate-900/5 backdrop-blur',
    'app-button': 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
    'app-button-primary': 'app-button bg-[var(--color-accent)] text-white hover:opacity-90',
    'app-button-secondary': 'app-button border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)]',
  },
  theme: {
    colors: {
      app: {
        accent: 'var(--color-accent)',
        background: 'var(--color-bg)',
        border: 'var(--color-border)',
        danger: 'var(--color-danger)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
      },
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
