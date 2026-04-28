import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const auth = useAuthStore()
  const isAuthenticated = computed(() => auth.isAuthenticated)

  async function login() {
    auth.setToken('demo-token')
    auth.setUser({
      id: 'demo-user',
      name: 'Demo User',
    })
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
