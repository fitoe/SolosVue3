import type { MinimalUser } from '~/types/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { AUTH_STORAGE_KEY } from '~/constants/app'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<MinimalUser | null>(null)
  const isAuthenticated = computed(() => Boolean(token.value))

  function setToken(value: string | null) {
    token.value = value

    if (value)
      localStorage.setItem(AUTH_STORAGE_KEY, value)
    else
      localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  function setUser(value: MinimalUser | null) {
    user.value = value
  }

  function clearAuth() {
    setToken(null)
    setUser(null)
  }

  function hydrate() {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored)
      token.value = stored
  }

  return {
    clearAuth,
    hydrate,
    isAuthenticated,
    setToken,
    setUser,
    token,
    user,
  }
})
