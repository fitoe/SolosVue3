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
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppCard from '~/components/app/AppCard.vue'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()
const username = ref('demo')
const password = ref('demo')
const loading = ref(false)
const errorMessage = ref('')

const nextPath = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/'
})

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    await login({
      token: 'demo-token',
      user: {
        id: username.value || 'demo-user',
        name: username.value || 'Demo User',
      },
    })
    await router.push(nextPath.value)
  } catch (caught) {
    errorMessage.value = caught instanceof Error ? caught.message : 'Unable to sign in'
  } finally {
    loading.value = false
  }
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
          Sign in
        </h1>
        <p class="text-sm text-[var(--color-text-soft)] leading-6">
          Minimal guest route, redirect support, token persistence, and a form shape that can be replaced by a real API call.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <label class="block space-y-2">
          <span class="text-sm font-medium">Username</span>
          <input
            v-model="username"
            autocomplete="username"
            class="w-full border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
            name="username"
            type="text"
          >
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium">Password</span>
          <input
            v-model="password"
            autocomplete="current-password"
            class="w-full border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
            name="password"
            type="password"
          >
        </label>

        <p v-if="errorMessage" class="rounded-2xl bg-[var(--color-danger-soft)] px-4 py-3 text-sm text-[var(--color-danger)]">
          {{ errorMessage }}
        </p>

        <button
          class="w-full app-button-primary py-3"
          :disabled="loading"
          type="submit"
        >
          {{ loading ? 'Signing in...' : 'Sign in with local demo session' }}
        </button>
      </form>

      <p class="text-xs text-[var(--color-text-muted)] leading-5">
        Redirect target: <span class="text-[var(--color-text)] font-medium">{{ nextPath }}</span>
      </p>
    </AppCard>
  </main>
</template>
