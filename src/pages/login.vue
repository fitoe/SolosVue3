<route lang="json">
{
  "meta": {
    "title": "Login",
    "layout": "blank",
    "guestOnly": true
  }
}
</route>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppCard from '~/components/app/AppCard.vue'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()
const nextPath = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/'
})

async function handleLogin() {
  await login()
  await router.push(nextPath.value)
}
</script>

<template>
  <main class="mx-auto max-w-lg min-h-screen flex items-center px-6 py-16">
    <AppCard class="w-full p-8 space-y-6">
      <div class="space-y-2">
        <p class="text-sm text-[var(--color-text-muted)] tracking-[0.25em] uppercase">
          Auth skeleton
        </p>
        <h1 class="text-3xl font-semibold">
          Demo login
        </h1>
        <p class="text-sm text-[var(--color-text-soft)] leading-6">
          Minimal guest route, redirect support, token persistence. Replace this with real form and real API.
        </p>
      </div>

      <button
        class="w-full rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm text-white font-medium"
        type="button"
        @click="handleLogin"
      >
        Sign in with demo token
      </button>

      <p class="text-xs text-[var(--color-text-muted)]">
        Redirect target: <span class="text-[var(--color-text)] font-medium">{{ nextPath }}</span>
      </p>
    </AppCard>
  </main>
</template>
