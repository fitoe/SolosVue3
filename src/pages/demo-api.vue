<route lang="json">
{
  "meta": {
    "title": "API Demo",
    "layout": "default",
    "requiresAuth": true
  }
}
</route>

<script setup lang="ts">
import type { DemoStatusResponse } from '~/types/api'
import { computed, onMounted, ref } from 'vue'
import { createApiError } from '~/api/interceptors'
import { getDemoStatus } from '~/api/modules/demo'
import { createAppConfig } from '~/app/config'
import AppCard from '~/components/app/AppCard.vue'
import AppContainer from '~/components/app/AppContainer.vue'
import AppLoading from '~/components/app/AppLoading.vue'

const { apiBaseUrl } = createAppConfig()
const data = ref<DemoStatusResponse>({
  generatedAt: '',
  message: '',
  stack: [],
})
const error = ref<string>('')
const loading = ref(false)
const statusItems = computed(() => data.value.stack)

async function send() {
  loading.value = true
  error.value = ''

  try {
    data.value = await getDemoStatus().send()
  } catch (caught) {
    error.value = createApiError(caught).message
  } finally {
    loading.value = false
  }
}

onMounted(send)
</script>

<template>
  <AppContainer class="space-y-6">
    <header class="space-y-2">
      <p class="text-sm text-[var(--color-text-muted)] tracking-[0.25em] uppercase">
        Request layer
      </p>
      <h1 class="text-3xl font-semibold">
        API module example
      </h1>
      <p class="text-sm text-[var(--color-text-soft)] leading-6">
        Shows request state, typed payload, retry trigger, and auth-protected route without requiring a backend service.
      </p>
    </header>

    <AppCard class="p-6 space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-semibold">
            Local status payload
          </h2>
          <p class="text-sm text-[var(--color-text-soft)] leading-6">
            Real endpoints resolve against <code>{{ apiBaseUrl || '/' }}</code>; this page keeps the starter runnable by using a local method adapter.
          </p>
        </div>

        <button
          class="app-button-secondary"
          type="button"
          @click="send()"
        >
          Retry
        </button>
      </div>

      <AppLoading v-if="loading" label="Fetching demo payload..." />

      <div v-else-if="error" class="border border-[var(--color-danger)]/30 rounded-2xl bg-[var(--color-danger-soft)] p-4 text-sm text-[var(--color-danger)]">
        <p class="font-medium">
          Request failed
        </p>
        <p class="mt-2">
          {{ error }}
        </p>
      </div>

      <div v-else class="space-y-4">
        <div class="space-y-2">
          <p class="text-base font-medium">
            {{ data.message }}
          </p>
          <p class="text-sm text-[var(--color-text-soft)]">
            Generated at {{ data.generatedAt || 'n/a' }}
          </p>
        </div>

        <ul class="grid gap-3 md:grid-cols-3">
          <li
            v-for="item in statusItems"
            :key="item.title"
            class="border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-raised)] p-4"
          >
            <p class="text-sm font-medium">
              {{ item.title }}
            </p>
            <p class="mt-2 text-sm text-[var(--color-text-soft)] leading-6">
              {{ item.detail }}
            </p>
          </li>
        </ul>
      </div>
    </AppCard>
  </AppContainer>
</template>
