import type { Router } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

export function applyRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const auth = useAuthStore()
    const requiresAuth = Boolean(to.meta.requiresAuth)
    const guestOnly = Boolean(to.meta.guestOnly)

    if (requiresAuth && !auth.isAuthenticated)
      return { path: '/login', query: { redirect: to.fullPath } }

    if (guestOnly && auth.isAuthenticated)
      return { path: '/' }

    return true
  })

  router.afterEach((to) => {
    const auth = useAuthStore()
    const title = typeof to.meta.title === 'string' ? to.meta.title : 'SolosVue3'
    document.title = auth.isAuthenticated ? `${title} · SolosVue3` : title
  })
}
