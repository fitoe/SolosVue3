<route lang="json">
{
  "meta": {
    "title": "Overview",
    "layout": "default"
  }
}
</route>

<script setup lang="ts">
import AppCard from '~/components/app/AppCard.vue'
import AppContainer from '~/components/app/AppContainer.vue'

const cards = [
  {
    title: 'Vite 8 baseline',
    text: 'Lean SPA template. No SSG, no PWA, no extra platform lock-in.',
  },
  {
    title: 'DX-first defaults',
    text: 'Typed file routes, auto imports, UnoCSS tokens, Vitest, ESLint flat config.',
  },
  {
    title: 'Business-ready core',
    text: 'alova request client, auth skeleton, route guards, theme tokens, removable demo.',
  },
]
</script>

<template>
  <AppContainer class="space-y-8">
    <section class="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <AppCard class="p-8 space-y-5">
        <p class="text-sm text-[var(--color-text-muted)] tracking-[0.3em] uppercase">
          SolosVue3
        </p>
        <div class="space-y-3">
          <h1 class="text-balance text-4xl font-semibold">
            Open Vue 3 scaffold with Vite 8, typed routes, alova, auth skeleton.
          </h1>
          <p class="max-w-2xl text-base text-[var(--color-text-soft)] leading-7">
            Inspired by Vitesse structure, but trimmed for modern SPA work. Base stays small.
            Presets stay optional.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink class="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm text-white font-medium" to="/demo-api">
            Open API demo
          </RouterLink>
          <RouterLink class="border border-[var(--color-border)] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[var(--color-surface-raised)]" to="/login">
            Open auth demo
          </RouterLink>
        </div>
      </AppCard>

      <AppCard class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Current defaults
          </h2>
          <span class="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs text-[var(--color-accent)] font-medium">
            base
          </span>
        </div>
        <ul class="text-sm text-[var(--color-text-soft)] space-y-3">
          <li>Vue 3.5 + Vite 8 + Router 4 + Pinia 3</li>
          <li>UnoCSS + CSS variable tokens</li>
          <li>Route guards + auth storage + theme persistence</li>
          <li>Vitest, vue-tsc, ESLint flat, removable demo</li>
        </ul>
      </AppCard>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <AppCard v-for="card in cards" :key="card.title" class="p-6 space-y-3">
        <h2 class="text-lg font-semibold">
          {{ card.title }}
        </h2>
        <p class="text-sm text-[var(--color-text-soft)] leading-6">
          {{ card.text }}
        </p>
      </AppCard>
    </section>
  </AppContainer>
</template>
