import type { Router } from 'vue-router'
import { APP_NAME } from '~/constants/app'
import { HOME_PATH, LOGIN_PATH } from '~/constants/routes'
import { useAuthStore } from '~/stores/auth'

export function applyRouterGuards(router: Router, appTitle = APP_NAME) {
  router.beforeEach((to) => {
    const auth = useAuthStore()
    const requiresAuth = Boolean(to.meta.requiresAuth)
    const guestOnly = Boolean(to.meta.guestOnly)

    if (requiresAuth && !auth.isAuthenticated)
      return { path: LOGIN_PATH, query: { redirect: to.fullPath } }

    if (guestOnly && auth.isAuthenticated)
      return { path: HOME_PATH }

    return true
  })

  router.afterEach((to) => {
    if (typeof document === 'undefined')
      return

    const title = typeof to.meta.title === 'string' ? to.meta.title : appTitle
    document.title = title === appTitle ? appTitle : `${title} · ${appTitle}`
  })
}
