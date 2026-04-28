import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export function createAppRouter() {
  const resolvedRoutes = setupLayouts([...routes])

  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: resolvedRoutes,
    scrollBehavior() {
      return { top: 0 }
    },
  })
}
