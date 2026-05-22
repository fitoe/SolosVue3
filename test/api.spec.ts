import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { parseJsonResponse } from '~/api/client'
import { createApiError, createRequestConfig, handleUnauthorized } from '~/api/interceptors'
import { useAuthStore } from '~/stores/auth'

describe('api helpers', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('injects bearer token into headers', () => {
    const auth = useAuthStore()
    auth.setToken('secret')

    const config = createRequestConfig({
      headers: {
        Accept: 'application/json',
      },
    })

    expect(config.headers?.Authorization).toBe('Bearer secret')
    expect(config.headers?.Accept).toBe('application/json')
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
