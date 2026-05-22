import type { Router } from 'vue-router'
import { APP_NAME } from '~/constants/app'
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
    if (typeof document === 'undefined')
      return

    const title = typeof to.meta.title === 'string' ? to.meta.title : APP_NAME
    document.title = title === APP_NAME ? APP_NAME : `${title} · ${APP_NAME}`
  })
}
