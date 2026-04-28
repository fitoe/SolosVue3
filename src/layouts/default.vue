<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useTheme } from '~/composables/useTheme'

const router = useRouter()
const { isAuthenticated, logout } = useAuth()
const { themeLabel, toggleTheme } = useTheme()

async function handleLogout() {
  await logout()
  await router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(17,102,239,0.08),_transparent_25%),linear-gradient(180deg,var(--color-bg),var(--color-bg-soft))]">
    <header class="sticky top-0 z-20 border-b border-[var(--color-border)]/80 bg-[var(--color-bg)]/80 backdrop-blur">
      <div class="mx-auto max-w-6xl flex items-center justify-between gap-4 px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="grid size-10 place-items-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[var(--color-accent)]/20 shadow-lg">
            <span class="i-carbon-rocket text-lg" />
          </div>
          <div>
            <p class="text-sm font-semibold">
              SolosVue3
            </p>
            <p class="text-xs text-[var(--color-text-muted)]">
              Vite 8 SPA base
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="border border-[var(--color-border)] rounded-full px-4 py-2 text-sm hover:bg-[var(--color-surface-raised)]" type="button" @click="toggleTheme">
            {{ themeLabel }}
          </button>
          <button
            v-if="isAuthenticated"
            class="rounded-full bg-[var(--color-text)] px-4 py-2 text-sm text-[var(--color-bg)]"
            type="button"
            @click="handleLogout"
          >
            退出登录
          </button>
        </div>
      </div>
    </header>

    <RouterView />
  </div>
</template>
