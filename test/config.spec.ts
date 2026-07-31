import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAppConfig } from '~/app/config'

describe('app config', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('reads the application title and normalizes the API base URL', () => {
    vi.stubEnv('VITE_APP_TITLE', 'My App')
    vi.stubEnv('VITE_API_BASE_URL', '/backend/')

    expect(createAppConfig()).toEqual({
      apiBaseUrl: '/backend',
      appTitle: 'My App',
    })
  })

  it('uses safe defaults for blank values', () => {
    vi.stubEnv('VITE_APP_TITLE', ' ')
    vi.stubEnv('VITE_API_BASE_URL', ' ')

    expect(createAppConfig()).toEqual({
      apiBaseUrl: '/api',
      appTitle: 'SolosVue3',
    })
  })
})
