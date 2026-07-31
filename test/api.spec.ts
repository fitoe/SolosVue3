import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { alovaClient, parseJsonResponse, setUnauthorizedHandler } from '~/api/client'
import { createApiError, handleUnauthorized } from '~/api/interceptors'
import { useAuthStore } from '~/stores/auth'

describe('api helpers', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  afterEach(() => {
    setUnauthorizedHandler()
    vi.unstubAllGlobals()
  })

  it('injects bearer tokens through the API client', async () => {
    const auth = useAuthStore()
    auth.setToken('secret')
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', {
      headers: { 'Content-Type': 'application/json' },
    }))
    vi.stubGlobal('fetch', fetchMock)

    await alovaClient.Get('/auth-check', { cacheFor: 0 }).send()

    const [, request] = fetchMock.mock.calls[0]
    expect(request.headers.Authorization).toBe('Bearer secret')
  })

  it('maps string errors into ApiError shape', () => {
    expect(createApiError('boom')).toEqual({
      code: 'UNKNOWN_ERROR',
      message: 'boom',
    })
  })

  it('maps response-like errors with status and body message', () => {
    expect(createApiError({
      message: 'No permission',
      response: {
        status: 403,
        statusText: 'Forbidden',
      },
    })).toEqual({
      code: 403,
      message: 'No permission',
      status: 403,
    })
  })

  it('parses 204 responses as null', async () => {
    const response = new Response(null, { status: 204 })

    await expect(parseJsonResponse(response)).resolves.toBeNull()
  })

  it('returns plain text responses without forcing JSON parsing', async () => {
    const response = new Response('ok', {
      headers: { 'Content-Type': 'text/plain' },
    })

    await expect(parseJsonResponse(response)).resolves.toBe('ok')
  })

  it('runs the unauthorized handler before rejecting a 401 response', async () => {
    const onUnauthorized = vi.fn()
    setUnauthorizedHandler(onUnauthorized)
    const response = new Response(JSON.stringify({ message: 'Expired session' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    })

    await expect(parseJsonResponse(response)).rejects.toMatchObject({ status: 401 })
    expect(onUnauthorized).toHaveBeenCalledOnce()
  })

  it('runs the unauthorized handler even when a 401 body is invalid JSON', async () => {
    const onUnauthorized = vi.fn()
    setUnauthorizedHandler(onUnauthorized)
    const response = new Response('{broken', {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    })

    await expect(parseJsonResponse(response)).rejects.toMatchObject({
      message: 'Server returned invalid JSON',
    })
    expect(onUnauthorized).toHaveBeenCalledOnce()
  })

  it('throws mapped errors for non-ok JSON responses', async () => {
    const response = new Response(JSON.stringify({ message: 'Bad request' }), {
      status: 400,
      statusText: 'Bad Request',
    })

    await expect(parseJsonResponse(response)).rejects.toMatchObject({
      code: 400,
      message: 'Bad request',
      status: 400,
    })
  })

  it('clears auth and redirects on unauthorized', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/login', component: { template: '<div />' } },
      ],
    })
    const auth = useAuthStore()
    auth.setToken('secret')
    await router.push('/')
    await router.isReady()

    await handleUnauthorized(router)

    expect(auth.token).toBeNull()
    expect(router.currentRoute.value.path).toBe('/login')
  })
})
