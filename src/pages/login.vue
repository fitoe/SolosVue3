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
import { normalizeRedirectPath } from '~/app/router'
import AppCard from '~/components/app/AppCard.vue'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { startDemoSession } = useAuth()
const displayName = ref('Demo User')
const loading = ref(false)
const errorMessage = ref('')

const nextPath = computed(() => {
  return normalizeRedirectPath(route.query.redirect)
})

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    await startDemoSession(displayName.value || 'Demo User')
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
          Local session demo
        </p>
        <h1 class="text-3xl font-semibold">
          Start a demo session
        </h1>
        <p class="text-sm text-[var(--color-text-soft)] leading-6">
          This creates a local-only session to demonstrate route guards and redirects. Replace it with your backend login flow.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <label class="block space-y-2">
          <span class="text-sm font-medium">Display name</span>
          <input
            v-model="displayName"
            autocomplete="name"
            class="w-full border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
            name="displayName"
            type="text"
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
          {{ loading ? 'Starting...' : 'Start local demo session' }}
        </button>
      </form>

      <p class="text-xs text-[var(--color-text-muted)] leading-5">
        Redirect target: <span class="text-[var(--color-text)] font-medium">{{ nextPath }}</span>
      </p>
    </AppCard>
  </main>
</template>
