import type { MinimalUser } from '~/types/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '~/constants/app'
import { readStorage, writeStorage } from '~/utils/storage'

function parseStoredUser(value: string | null): MinimalUser | null {
  if (!value)
    return null

  try {
    const parsed = JSON.parse(value) as Partial<MinimalUser>
    if (typeof parsed.id === 'string' && typeof parsed.name === 'string')
      return { id: parsed.id, name: parsed.name }
  } catch {
    // Ignore malformed persisted state and continue with an anonymous session.
  }

  return null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<MinimalUser | null>(null)
  const isAuthenticated = computed(() => Boolean(token.value))

  function setToken(value: string | null) {
    token.value = value
    writeStorage(AUTH_STORAGE_KEY, value)
  }

  function setUser(value: MinimalUser | null) {
    user.value = value
    writeStorage(USER_STORAGE_KEY, value ? JSON.stringify(value) : null)
  }

  function setAuth(payload: { token: string, user?: MinimalUser | null }) {
    setToken(payload.token)
    setUser(payload.user ?? null)
  }

  function clearAuth() {
    setToken(null)
    setUser(null)
  }

  function hydrate() {
    token.value = readStorage(AUTH_STORAGE_KEY)
    user.value = parseStoredUser(readStorage(USER_STORAGE_KEY))
  }

  return {
    clearAuth,
    hydrate,
    isAuthenticated,
    setAuth,
    setToken,
    setUser,
    token,
    user,
  }
})
