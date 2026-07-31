import type { Router } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { applyRouterGuards } from '~/app/guard'
import { createAppRouter, normalizeRedirectPath } from '~/app/router'
import { useAuthStore } from '~/stores/auth'

describe('router guards', () => {
  let router: Router

  beforeEach(async () => {
    setActivePinia(createPinia())
    router = createAppRouter()
    applyRouterGuards(router, 'Test App')
    await router.push('/')
    await router.isReady()
  })

  it('redirects unauthenticated users to login', async () => {
    await router.push('/demo-api')

    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.query.redirect).toBe('/demo-api')
  })

  it('redirects authenticated users away from guest page', async () => {
    const auth = useAuthStore()
    auth.setToken('demo-token')

    await router.push('/login')

    expect(router.currentRoute.value.path).toBe('/')
  })

  it('uses the configured application title', () => {
    expect(document.title).toBe('概览 · Test App')
  })

  it('keeps login redirects inside the application', () => {
    expect(normalizeRedirectPath('/demo-api')).toBe('/demo-api')
    expect(normalizeRedirectPath('//example.com')).toBe('/')
    expect(normalizeRedirectPath('https://example.com')).toBe('/')
  })
})
