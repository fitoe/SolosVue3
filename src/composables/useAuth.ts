import type { LoginResponse } from '~/types/auth'
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const fallbackDemoLogin: LoginResponse = {
  token: 'demo-token',
  user: {
    id: 'demo-user',
    name: 'Demo User',
  },
}

export function useAuth() {
  const auth = useAuthStore()
  const isAuthenticated = computed(() => auth.isAuthenticated)

  async function login(payload: LoginResponse = fallbackDemoLogin) {
    auth.setAuth(payload)
  }

  async function logout() {
    auth.clearAuth()
  }

  return {
    isAuthenticated,
    login,
    logout,
    user: computed(() => auth.user),
  }
}
