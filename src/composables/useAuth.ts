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

  async function startDemoSession(name = fallbackDemoLogin.user.name) {
    const payload: LoginResponse = {
      ...fallbackDemoLogin,
      user: {
        ...fallbackDemoLogin.user,
        name,
      },
    }
    auth.setAuth(payload)
  }

  async function logout() {
    auth.clearAuth()
  }

  return {
    isAuthenticated,
    logout,
    startDemoSession,
    user: computed(() => auth.user),
  }
}
